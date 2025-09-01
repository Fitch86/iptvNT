import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { AppConfig } from './environments/environment';

if (AppConfig.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule, {
        preserveWhitespaces: false,
    })
    .then(() => {
        // Register service worker for web builds
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/ngsw-worker.js');
        }
    })
    .catch((err) => console.error(err));
