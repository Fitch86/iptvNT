import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface MpvProcess {
    id: number;
    url: string;
    start_time: number;
    last_known_time: number | null;
    thumbnail?: string;
    title: string;
}

@Injectable({
    providedIn: 'root',
})
export class MpvPlayerService {
    private activeProcessesSubject = new BehaviorSubject<MpvProcess[]>([]);
    public activeProcesses$ = this.activeProcessesSubject.asObservable();

    constructor() {
        // Note: Tauri functionality is not implemented in this build
        // MPV player service is disabled
    }

    private async initializeEventListeners() {
        // Tauri functionality not available in this build
        console.warn('MPV player service requires Tauri, which is not available in this build');
    }

    private async loadActiveProcesses() {
        // Tauri functionality not available in this build
        console.warn('MPV player service requires Tauri, which is not available in this build');
    }

    async openStream(
        url: string,
        title: string,
        thumbnail?: string,
        mpvPath: string = ''
    ): Promise<number> {
        console.warn('MPV player service requires Tauri, which is not available in this build');
        return -1;
    }

    async playStream(processId: number): Promise<void> {
        console.warn('MPV player service requires Tauri, which is not available in this build');
    }

    async pauseStream(processId: number): Promise<void> {
        console.warn('MPV player service requires Tauri, which is not available in this build');
    }

    async closeStream(processId: number): Promise<void> {
        console.warn('MPV player service requires Tauri, which is not available in this build');
    }
}
