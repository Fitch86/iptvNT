import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AppConfig } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config: any = {};
  private readonly BACKEND_URL_KEY = 'iptvnt_backend_url';

  constructor(private http: HttpClient) {}

  async loadConfig(): Promise<void> {
    await this.refreshConfig();
  }

  private async refreshConfig(): Promise<void> {
    // Priority: localStorage > environment > config.json
    const localBackendUrl = this.getLocalBackendUrl();
    
    if (localBackendUrl) {
      // Use localStorage setting if available
      this.config = { BACKEND_URL: localBackendUrl };
    } else if (!AppConfig.production && AppConfig.BACKEND_URL) {
      // In development, use environment configuration
      this.config = { BACKEND_URL: AppConfig.BACKEND_URL };
    } else {
      // In production or fallback, load from config.json
      try {
        this.config = await firstValueFrom(
          this.http.get<any>('/assets/config.json')
        );
      } catch (error) {
        console.warn('Failed to load config, using defaults');
        this.config = { BACKEND_URL: 'http://localhost:3001' };
      }
    }
  }

  get backendUrl(): string {
    // Always check localStorage first for the most current value
    const localBackendUrl = this.getLocalBackendUrl();
    if (localBackendUrl) {
      console.log('ConfigService: Using localStorage backend URL:', localBackendUrl);
      return localBackendUrl;
    }
    const configUrl = this.config.BACKEND_URL || 'http://localhost:3001';
    console.log('ConfigService: Using config backend URL:', configUrl);
    return configUrl;
  }

  get version(): string {
    return require('../../../package.json').version;
  }

  // Methods for managing local backend URL setting
  async setLocalBackendUrl(url: string): Promise<void> {
    console.log('ConfigService: Setting backend URL to:', url);
    if (url && url.trim()) {
      localStorage.setItem(this.BACKEND_URL_KEY, url.trim());
      this.config = { BACKEND_URL: url.trim() };
    } else {
      localStorage.removeItem(this.BACKEND_URL_KEY);
      // Reload config to get fallback value
      await this.refreshConfig();
    }
    console.log('ConfigService: Backend URL updated, current value:', this.backendUrl);
  }

  getLocalBackendUrl(): string | null {
    return localStorage.getItem(this.BACKEND_URL_KEY);
  }

  async clearLocalBackendUrl(): Promise<void> {
    localStorage.removeItem(this.BACKEND_URL_KEY);
    // Reload config to get fallback value
    await this.refreshConfig();
  }

  private getDefaultBackendUrl(): string {
    if (!AppConfig.production && AppConfig.BACKEND_URL) {
      return AppConfig.BACKEND_URL;
    }
    return 'http://localhost:3001';
  }
}
