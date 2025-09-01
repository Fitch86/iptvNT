import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { catchError, firstValueFrom, throwError, map } from 'rxjs';
import { parse } from 'iptv-playlist-parser';
import {
    ERROR,
    PLAYLIST_PARSE_BY_URL,
    PLAYLIST_PARSE_RESPONSE,
    PLAYLIST_UPDATE,
    STALKER_REQUEST,
    STALKER_RESPONSE,
    XTREAM_REQUEST,
    XTREAM_RESPONSE,
} from '../../../shared/ipc-commands';
import { Playlist } from '../../../shared/playlist.interface';
import { createPlaylistObject, getFilenameFromUrl } from '../../../shared/playlist.utils';
import { ConfigService } from './config.service';
import * as PlaylistActions from '../state/actions';
import { DataService } from './data.service';

/**
 * Proxy service for handling URL transformation to use tvcors-proxy
 */
@Injectable({
    providedIn: 'root',
})
export class ProxyService {
    private readonly configService = inject(ConfigService);

    /**
     * Converts a video stream URL to use the tvcors-proxy
     */
    getProxiedVideoUrl(originalUrl: string, userAgent?: string): string {
        if (!originalUrl || originalUrl.includes(this.configService.backendUrl)) {
            return originalUrl;
        }

        const params = new URLSearchParams({ url: originalUrl });
        if (userAgent) params.append('ua', userAgent);

        // Use m3u8 proxy for HLS streams, segment proxy for others
        const endpoint = this.isM3U8Url(originalUrl) ? 'm3u8' : 'segment';
        return `${this.configService.backendUrl}/api/proxy/${endpoint}?${params.toString()}`;
    }

    /**
     * Converts a playlist URL to use the tvcors-proxy
     */
    getProxiedPlaylistUrl(originalUrl: string, userAgent?: string): string {
        if (!originalUrl || originalUrl.includes(this.configService.backendUrl)) {
            return originalUrl;
        }

        const params = new URLSearchParams({ url: originalUrl });
        if (userAgent) params.append('ua', userAgent);

        return `${this.configService.backendUrl}/api/proxy/m3u?${params.toString()}`;
    }

    /**
     * Check if URL is an M3U8 stream
     */
    private isM3U8Url(url: string): boolean {
        return url.toLowerCase().includes('.m3u8') || 
               url.toLowerCase().includes('application/x-mpegurl') ||
               url.toLowerCase().includes('application/vnd.apple.mpegurl');
    }
}

@Injectable({
    providedIn: 'root',
})
export class PwaService extends DataService {
    private readonly http = inject(HttpClient);
    private readonly snackBar = inject(MatSnackBar);
    private readonly store = inject(Store);
    private readonly swUpdate = inject(SwUpdate);
    private readonly translateService = inject(TranslateService);
    private readonly configService = inject(ConfigService);

    /** Proxy URL to avoid CORS issues */
    get corsProxyUrl(): string {
        return this.configService.backendUrl || '';
    }

    constructor() {
        super();
        console.log('PWA service initialized...');
    }

    /** Uses service worker mechanism to check for available application updates */
    checkUpdates() {
        this.swUpdate.versionUpdates.subscribe(() => {
            this.snackBar
                .open(
                    this.translateService.instant('UPDATE_AVAILABLE'),
                    this.translateService.instant('REFRESH')
                )
                .onAction()
                .subscribe(() => {
                    window.location.reload();
                });
        });
    }

    getAppVersion(): string {
        return this.configService.version;
    }

    /**
     * Handles incoming IPC commands
     * @param type ipc command type
     * @param payload payload
     */
    sendIpcEvent(type: string, payload?: unknown) {
        if (type === PLAYLIST_PARSE_BY_URL) {
            this.fetchFromUrl(payload);
        } else if (type === PLAYLIST_UPDATE) {
            this.refreshPlaylist(payload);
        } else if (type === XTREAM_REQUEST) {
            return this.forwardXtreamRequest(
                payload as { url: string; params: Record<string, string> }
            );
        } else if (type === STALKER_REQUEST) {
            this.forwardStalkerRequest(
                payload as {
                    url: string;
                    macAddress: string;
                    params: Record<string, string>;
                }
            );
        } else {
            return Promise.resolve();
        }
    }

    refreshPlaylist(payload: Partial<Playlist & { id: string }>) {
        this.getPlaylistFromUrl(payload.url, payload.userAgent)
            .pipe(
                catchError((error) => {
                    window.postMessage({
                        type: ERROR,
                    });
                    return throwError(() => error);
                })
            )
            .subscribe((playlistContent: string) => {
                // Parse the M3U content and create playlist object
                const parsedPlaylist = parse(playlistContent);
                const playlist = createPlaylistObject(
                    payload.title || 'Updated Playlist',
                    parsedPlaylist,
                    payload.url,
                    'URL',
                    payload.userAgent
                );
                
                this.store.dispatch(
                    PlaylistActions.updatePlaylist({
                        playlist: playlist,
                        playlistId: payload.id,
                    })
                );

                this.snackBar.open(
                    this.translateService.instant(
                        'HOME.PLAYLISTS.PLAYLIST_UPDATE_SUCCESS'
                    ),
                    null,
                    { duration: 2000 }
                );
            });
    }

    /**
     * Fetches playlist from the specified url
     * @param payload playlist payload
     */
    fetchFromUrl(payload: Partial<Playlist>): void {
        this.getPlaylistFromUrl(payload.url, payload.userAgent)
            .pipe(
                catchError((error) => {
                    window.postMessage({
                        type: ERROR,
                        message: this.getErrorMessageByStatusCode(error.status),
                        status: error.status,
                    });
                    return throwError(() => error);
                })
            )
            .subscribe((response: any) => {
                try {
                    // 处理不同的响应格式，优先检查payload字段
                    let playlistContent: string;
                    
                    if (response && typeof response.payload === 'string') {
                        // 后端返回的标准格式：{ payload: "M3U内容" }
                        playlistContent = response.payload;
                    } else if (typeof response === 'string') {
                        // 直接返回字符串
                        playlistContent = response;
                    } else if (response && typeof response.content === 'string') {
                        playlistContent = response.content;
                    } else if (response && typeof response.data === 'string') {
                        playlistContent = response.data;
                    } else if (response && typeof response.text === 'string') {
                        playlistContent = response.text;
                    } else {
                        throw new Error('Invalid response format: no valid playlist content found');
                    }
                    
                    // 验证内容是否为有效的M3U格式
                    if (!playlistContent || typeof playlistContent !== 'string') {
                        throw new Error('Invalid playlist content format');
                    }
                    
                    // 验证内容是否看起来像M3U格式
                    if (!playlistContent.includes('#EXTM3U') && !playlistContent.includes('#EXTINF')) {
                        throw new Error('Content does not appear to be a valid M3U playlist');
                    }
                    
                    // Parse the response content using iptv-playlist-parser
                    const parsedPlaylist = parse(playlistContent);
                    
                    // Create standardized playlist object
                    const playlist = createPlaylistObject(
                        payload.title || getFilenameFromUrl(payload.url) || 'Untitled playlist',
                        parsedPlaylist,
                        payload.url,
                        'URL',
                        payload.userAgent
                    );
                    
                    window.postMessage({
                        type: PLAYLIST_PARSE_RESPONSE,
                        payload: { ...playlist, isTemporary: payload.isTemporary },
                    });
                } catch (parseError) {
                    console.error('Failed to parse playlist:', parseError);
                    console.error('Response format:', typeof response, response);
                    window.postMessage({
                        type: ERROR,
                        message: `Failed to parse playlist content: ${parseError.message}`,
                        status: 500,
                    });
                }
            });
    }

    getErrorMessageByStatusCode(status: number) {
        let message = 'Something went wrong';
        switch (status) {
            case 0:
                message = 'The backend is not reachable';
                break;
            case 413:
                message =
                    'This file is too big. Use standalone or self-hosted version of the app.';
                break;
            default:
                break;
        }
        return message;
    }

    async forwardXtreamRequest(payload: {
        url: string;
        params: Record<string, string>;
        macAddress?: string;
    }) {
        const headers = payload.macAddress
            ? {
                  headers: {
                      Cookie: `mac=${payload.macAddress}`,
                  },
              }
            : {};
        try {
            let result: any;
            const queryParams = new URLSearchParams({
                url: payload.url,
                ...payload.params,
            });
            const response = await firstValueFrom(
                this.http.get(this.corsProxyUrl ? `${this.corsProxyUrl}/api/proxy/xtream?${queryParams.toString()}` : `/api/proxy/xtream?${queryParams.toString()}`, headers)
            );

            if (!(response as any).payload) {
                if (payload.params.action === 'get_account_info') return;

                result = {
                    type: ERROR,
                    status: (response as any).status,
                    message: (response as any).message ?? 'Unknown error',
                };
                window.postMessage(result);
            } else {
                result = {
                    type: XTREAM_RESPONSE,
                    payload: (response as any).payload,
                    action: payload.params.action,
                };
                window.postMessage(result);
            }
            return result;
        } catch (error: any) {
            if (payload.params.action === 'get_account_info') return;
            window.postMessage({
                type: ERROR,
                status: error.error?.status,
                message: error.error?.message ?? 'Unknown error',
            });
        }
    }

    forwardStalkerRequest(payload: {
        url: string;
        params: Record<string, string>;
        macAddress: string;
    }) {
        const queryParams = new URLSearchParams({
            url: payload.url,
            ...payload.params,
        });
        return this.http
            .get(this.corsProxyUrl ? `${this.corsProxyUrl}/api/proxy/stalker?${queryParams.toString()}` : `/api/proxy/stalker?${queryParams.toString()}`, {
                headers: {
                    Cookie: `mac=${payload.macAddress}`,
                },
            })
            .subscribe((response) => {
                window.postMessage({
                    type: STALKER_RESPONSE,
                    payload: (response as any).payload,
                    action: payload.params.action,
                });
            });
    }

    getPlaylistFromUrl(url: string, userAgent?: string) {
        const params = new URLSearchParams({ url });
        if (userAgent) {
            params.append('ua', userAgent);
        }
        
        const proxyUrl = this.corsProxyUrl ? `${this.corsProxyUrl}/api/proxy/m3u?${params.toString()}` : `/api/proxy/m3u?${params.toString()}`;
        
        return this.http.get(proxyUrl).pipe(
            map((response: any) => {
                // Extract the actual M3U content from the proxy response
                if (response && typeof response.payload === 'string') {
                    return response.payload;
                } else if (typeof response === 'string') {
                    return response;
                } else {
                    throw new Error('Invalid response format from proxy');
                }
            })
        );
    }

    removeAllListeners(): void {
        // not implemented
    }

    listenOn(_command: string, callback: (...args: any[]) => void): void {
        window.addEventListener('message', callback);
    }

    getAppEnvironment(): string {
        return 'pwa';
    }

    fetchData() {
        // not implemented
    }
}
