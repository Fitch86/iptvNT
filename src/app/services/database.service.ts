import { Injectable } from '@angular/core';
import { PlaylistMeta } from '../shared/playlist-meta.type';

export interface XCategoryFromDb {
    id: number;
    name: string;
    playlist_id: string;
    type: 'movies' | 'live' | 'series';
    xtream_id: number;
}

export interface XtreamContent {
    id: number;
    category_id: number;
    title: string;
    rating: string;
    added: string;
    poster_url: string;
    xtream_id: number;
    type: string;
}

export interface GlobalSearchResult extends XtreamContent {
    playlist_id: string;
    playlist_name: string;
}

export interface GlobalRecentItem extends XtreamContent {
    playlist_id: string;
    playlist_name: string;
    viewed_at: string;
}

export interface XtreamPlaylist {
    id: string;
    name: string;
    serverUrl: string;
    username: string;
    password: string;
    type: string;
}

@Injectable({
    providedIn: 'root',
})
export class DatabaseService {
    constructor() {
        console.warn('Database service requires Tauri backend, which is not available in this build');
    }

    async getConnection(): Promise<any> {
        throw new Error('Database functionality requires Tauri, which is not available in this build');
    }

    async deletePlaylist(playlistId: string): Promise<boolean> {
        console.warn('Database functionality requires Tauri backend');
        return false;
    }

    async createPlaylist(playlist: PlaylistMeta): Promise<void> {
        console.warn('Database functionality requires Tauri backend');
    }

    async saveXtreamCategories(
        playlistId: string,
        categories: any[],
        type: 'live' | 'movies' | 'series'
    ): Promise<void> {
        console.warn('Database functionality requires Tauri backend');
    }

    async saveXtreamContent(
        playlistId: string,
        streams: any[],
        type: 'live' | 'movie' | 'series',
        onProgress?: (count: number) => void
    ): Promise<number> {
        console.warn('Database functionality requires Tauri backend');
        return 0;
    }

    async getXtreamCategories(
        playlistId: string,
        type: 'live' | 'movies' | 'series'
    ): Promise<XCategoryFromDb[]> {
        console.warn('Database functionality requires Tauri backend');
        return [];
    }

    async hasXtreamCategories(
        playlistId: string,
        type: 'live' | 'movies' | 'series'
    ): Promise<boolean> {
        console.warn('Database functionality requires Tauri backend');
        return false;
    }

    async getXtreamContent(
        playlistId: string,
        type: 'live' | 'movie' | 'series'
    ): Promise<XtreamContent[]> {
        console.warn('Database functionality requires Tauri backend');
        return [];
    }

    async hasXtreamContent(
        playlistId: string,
        type: 'live' | 'movie' | 'series'
    ): Promise<boolean> {
        console.warn('Database functionality requires Tauri backend');
        return false;
    }

    async searchXtreamContent(
        playlistId: string,
        searchTerm: string,
        types: string[]
    ): Promise<XtreamContent[]> {
        console.warn('Database functionality requires Tauri backend');
        return [];
    }

    async globalSearchContent(
        searchTerm: string,
        types: string[]
    ): Promise<GlobalSearchResult[]> {
        console.warn('Database functionality requires Tauri backend');
        return [];
    }

    async getGlobalRecentlyViewed(): Promise<GlobalRecentItem[]> {
        console.warn('Database functionality requires Tauri backend');
        return [];
    }

    async clearGlobalRecentlyViewed(): Promise<void> {
        console.warn('Database functionality requires Tauri backend');
    }

    async updateXtreamPlaylist(playlist: any): Promise<boolean> {
        console.warn('Database functionality requires Tauri backend');
        return false;
    }

    async updateXtreamPlaylistDetails(playlist: {
        id: string;
        title: string;
        username?: string;
        password?: string;
        serverUrl?: string;
    }): Promise<boolean> {
        console.warn('Database functionality requires Tauri backend');
        return false;
    }

    async getPlaylistById(playlistId: string): Promise<XtreamPlaylist | null> {
        console.warn('Database functionality requires Tauri backend');
        return null;
    }
}
