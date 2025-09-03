import { Injectable, inject } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root',
})
export class VideoProxyService {
    private readonly configService = inject(ConfigService);

    /**
     * Get current proxy base URL dynamically
     */
    private get proxyBaseUrl(): string {
        return this.configService.backendUrl || '/api';
    }

    /**
     * Converts a video stream URL to use the tvcors-proxy for streaming
     * @param originalUrl The original video stream URL
     * @param userAgent Optional user agent string
     * @returns Proxied URL for video streaming
     */
    getProxiedVideoUrl(originalUrl: string, userAgent?: string): string {
        if (!originalUrl || originalUrl.includes(this.proxyBaseUrl)) {
            return originalUrl;
        }

        const params = new URLSearchParams({ url: originalUrl });
        if (userAgent) {
            params.append('ua', userAgent);
        }
        
        // Add source parameter for better proxy handling
        if (this.isM3U8Url(originalUrl)) {
            // Extract domain from URL for source identification
            try {
                const urlObj = new URL(originalUrl);
                const source = urlObj.hostname.replace('www.', '');
                params.append('source', source);
            } catch {
                console.warn('Could not extract source from URL:', originalUrl);
            }
        }

        // Use m3u8 proxy for HLS streams, segment proxy for others
        const endpoint = this.isM3U8Url(originalUrl) ? 'm3u8' : 'segment';
        const proxiedUrl = this.proxyBaseUrl ? `${this.proxyBaseUrl}/api/proxy/${endpoint}?${params.toString()}` : `/api/proxy/${endpoint}?${params.toString()}`;
        
        
        return proxiedUrl;
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
