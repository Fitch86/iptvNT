import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { EpgProgram } from '../player/models/epg-program.model';

@Injectable({
    providedIn: 'root',
})
export class EpgService {
    private epgAvailable = new BehaviorSubject<boolean>(false);
    private currentEpgPrograms = new BehaviorSubject<EpgProgram[]>([]);

    epgAvailable$ = this.epgAvailable.asObservable();
    currentEpgPrograms$ = this.currentEpgPrograms.asObservable();

    constructor(
        private snackBar: MatSnackBar,
        private translate: TranslateService,
        private store: Store
    ) {}

    /**
     * Fetches EPG from the given URLs
     */
    fetchEpg(urls: string[]): void {
        // EPG fetching not available in web version
        console.log('EPG fetching is only available in desktop version');
        this.epgAvailable.next(false);
    }

    /**
     * Gets EPG programs for a specific channel
     */
    getChannelPrograms(channelId: string): void {
        // EPG programs not available in web version
        console.log('EPG programs are only available in desktop version');
        this.currentEpgPrograms.next([]);
    }

    private showFetchSnackbar(): void {
        this.snackBar.open(
            this.translate.instant('EPG.FETCH_STARTED'),
            null,
            { duration: 2000 }
        );
    }

    private showSuccessSnackbar(): void {
        this.snackBar.open(
            this.translate.instant('EPG.FETCH_SUCCESS'),
            null,
            { duration: 2000 }
        );
    }

    private showErrorSnackbar(): void {
        this.snackBar.open(
            this.translate.instant('EPG.FETCH_ERROR'),
            null,
            { duration: 2000 }
        );
    }
}
