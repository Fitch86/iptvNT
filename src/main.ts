import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { ConfigService } from './app/services/config.service';
import { AppConfig } from './environments/environment';

if (AppConfig.production) {
    enableProdMode();
}

async function bootstrap() {
  const app = await bootstrapApplication(AppComponent, appConfig);
  const configService = app.injector.get(ConfigService);
  await configService.loadConfig();
  return app;
}

bootstrap().catch(err => console.error(err));
