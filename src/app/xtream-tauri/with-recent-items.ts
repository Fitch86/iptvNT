import { inject, Signal } from '@angular/core';
import {
    patchState,
    signalStoreFeature,
    withMethods,
    withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, of } from 'rxjs';
import { DatabaseService } from '../services/database.service';

export interface RecentlyViewedItem {
    id: number;
    title: string;
    type: 'live' | 'movie' | 'series';
    poster_url: string;
    content_id: number;
    playlist_id: string;
    viewed_at: string;
    xtream_id: number;
}

export const withRecentItems = function () {
    return signalStoreFeature(
        withState({
            recentItems: [],
        }),
        withMethods((store, dbService = inject(DatabaseService)) => ({
            loadRecentItems: rxMethod<{ id: string }>(
                pipe(
                    switchMap(async (playlist) => {
                        console.warn('Recent items functionality requires Tauri backend, which is not available in this build');
                        return [];
                    }),
                    tap((items: RecentlyViewedItem[]) =>
                        patchState(store, { recentItems: items })
                    )
                )
            ),
        })),
        withMethods((store, dbService = inject(DatabaseService)) => ({
            addRecentItem: rxMethod<{
                contentId: number;
                playlist: Signal<{ id: string }>;
            }>(
                pipe(
                    switchMap(async ({ contentId, playlist }) => {
                        console.warn('Recent items functionality requires Tauri backend, which is not available in this build');
                        return;
                    })
                )
            ),
            clearRecentItems: rxMethod<{ id: string }>(
                pipe(
                    switchMap(async (playlist) => {
                        console.warn('Recent items functionality requires Tauri backend, which is not available in this build');
                        return store.loadRecentItems({ id: playlist.id });
                    })
                )
            ),
            removeRecentItem: rxMethod<{ itemId: number; playlistId: string }>(
                pipe(
                    switchMap(async ({ itemId, playlistId }) => {
                        console.warn('Recent items functionality requires Tauri backend, which is not available in this build');
                        return store.loadRecentItems({ id: playlistId });
                    })
                )
            ),
            async loadGlobalRecentItems() {
                console.warn('Recent items functionality requires Tauri backend, which is not available in this build');
                patchState(store, { recentItems: [] });
            },
            async clearGlobalRecentlyViewed() {
                console.warn('Recent items functionality requires Tauri backend, which is not available in this build');
                patchState(store, { recentItems: [] });
            },
        }))
    );
};
