import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConfig } from '../environments/environment';
import { xtreamRoutes } from './xtream-tauri/xtream.routes';

const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./home/home.component').then((c) => c.HomeComponent),
    },
    {
        path: 'playlists/:id',
        loadComponent: () =>
            import('./player/components/video-player/video-player.component').then(
                (c) => c.VideoPlayerComponent
            ),
    },
    ...xtreamRoutes,
    {
        path: 'settings',
        loadComponent: () =>
            import('./settings/settings.component').then((c) => c.SettingsComponent),
    },
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            enableTracing: !AppConfig.production,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
