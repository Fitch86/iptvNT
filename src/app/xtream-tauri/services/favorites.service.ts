import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DatabaseService } from '../../services/database.service';
import { FavoriteItem } from './favorite-item.interface';

@Injectable({
    providedIn: 'root',
})
export class FavoritesService {
    private dbService = inject(DatabaseService);

    async addToFavorites(item: {
        content_id: number;
        playlist_id: string;
    }): Promise<void> {
        console.warn('Favorites functionality requires Tauri backend, which is not available in this build');
    }

    async removeFromFavorites(
        contentId: number,
        playlistId: string
    ): Promise<void> {
        console.warn('Favorites functionality requires Tauri backend, which is not available in this build');
    }

    async isFavorite(contentId: number, playlistId: string): Promise<boolean> {
        console.warn('Favorites functionality requires Tauri backend, which is not available in this build');
        return false;
    }

    getFavorites(playlistId: string): Observable<FavoriteItem[]> {
        console.warn('Favorites functionality requires Tauri backend, which is not available in this build');
        return of([]);
    }
}
