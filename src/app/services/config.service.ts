import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config: any = {};

  constructor(private http: HttpClient) {}

  async loadConfig(): Promise<void> {
    try {
      this.config = await firstValueFrom(
        this.http.get<any>('/assets/config.json')
      );
    } catch (error) {
      console.warn('Failed to load config, using defaults');
      this.config = { BACKEND_URL: 'http://localhost:3001' };
    }
  }

  get backendUrl(): string {
    return this.config.BACKEND_URL || 'http://localhost:3001';
  }

  get version(): string {
    return require('../../../package.json').version;
  }
}
