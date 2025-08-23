import {
    CdkDragDrop,
    DragDropModule,
    moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, TitleCasePipe, KeyValue } from '@angular/common';
import {
    Component,
    ElementRef,
    HostListener,
    Input,
    ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { map, skipWhile } from 'rxjs';
import { Channel } from '../../../../../shared/channel.interface';
import { EpgService } from '../../../services/epg.service';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';
import * as PlaylistActions from '../../../state/actions';
import {
    selectActivePlaylistId,
    selectFavorites,
} from '../../../state/selectors';
import { ChannelListItemComponent } from './channel-list-item/channel-list-item.component';

@Component({
    selector: 'app-channel-list-container',
    templateUrl: './channel-list-container.component.html',
    styleUrls: ['./channel-list-container.component.scss'],
    imports: [
        ChannelListItemComponent,
        CommonModule,
        DragDropModule,
        FilterPipe,
        FormsModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatTabsModule,
        ScrollingModule,
        TitleCasePipe,
        TranslatePipe,
    ],
})
export class ChannelListContainerComponent {
    /**
     * Channels array
     * Create local copy of the store for local manipulations without updates in the store
     */
    _channelList: Channel[];
    get channelList(): Channel[] {
        return this._channelList;
    }

    @Input('channelList')  
    set channelList(value: Channel[]) {  
        // 过滤掉有问题的频道，确保所有必需字段存在  
        const validChannels = (value || []).filter(channel => {  
            // 确保频道对象存在  
            if (!channel) return false;  
              
            // 确保基本字段存在  
            if (!channel.name || !channel.url) return false;  
              
            // 确保 group 对象存在且 title 是有效字符串  
            if (!channel.group ||   
                typeof channel.group.title !== 'string' ||   
                channel.group.title.trim() === '') {  
                // 为没有有效 group.title 的频道设置默认值  
                channel.group = { title: '未分类' };  
            }  
              
            return true;  
        });  
          
        this._channelList = validChannels;  
        this.groupedChannels = _.default.groupBy(validChannels, 'group.title');  
    }

    /** Object with channels sorted by groups */
    groupedChannels!: { [key: string]: Channel[] };

    /** Selected channel */
    selected!: Channel;

    /** Search term for channel filter */
    searchTerm: any = {
        name: '',
    };

    /** Search field element */
    @ViewChild('search') searchElement: ElementRef;

    /** Register ctrl+f as keyboard hotkey to focus the search input field */
    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        if (event.key === 'f' && event.ctrlKey) {
            this.searchElement.nativeElement.focus();
        }
    }

    /** ID of the current playlist */
    playlistId$ = this.store
        .select(selectActivePlaylistId)
        .pipe(
            skipWhile(
                (playlistId) => playlistId === '' || playlistId === undefined
            )
        );

    /** List with favorites */
    favorites$ = this.store.select(selectFavorites).pipe(
        map(
            (
                favoriteChannelIds // TODO: move to selector
            ) =>
                favoriteChannelIds.map((favoriteChannelId) =>
                    this.channelList.find(
                        (channel) => channel.id === favoriteChannelId
                    )
                )
        )
    );

    constructor(
        private readonly epgService: EpgService,
        private readonly snackBar: MatSnackBar,
        private readonly store: Store,
        private readonly translateService: TranslateService
    ) {}

    /**
     * Sets clicked channel as selected and emits them to the parent component
     * @param channel selected channel
     */
    selectChannel(channel: Channel): void {
        this.selected = channel;
        this.store.dispatch(PlaylistActions.setActiveChannel({ channel }));

        const epgChannelId = channel?.name.trim();

        if (epgChannelId) {
            this.epgService.getChannelPrograms(epgChannelId);
        }
    }

    /**
     * Toggles favorite flag for the given channel
     * @param channel channel to update
     * @param clickEvent mouse click event
     */
    toggleFavoriteChannel(channel: Channel, clickEvent: MouseEvent): void {
        clickEvent.stopPropagation();
        this.snackBar.open(
            this.translateService.instant('CHANNELS.FAVORITES_UPDATED'),
            null,
            { duration: 2000 }
        );
        this.store.dispatch(PlaylistActions.updateFavorites({ channel }));
    }

    trackByFn(_: number, channel: Channel): string {
        return channel?.id;
    }

    drop(event: CdkDragDrop<Channel[]>, favorites: Channel[]) {
        moveItemInArray(favorites, event.previousIndex, event.currentIndex);
        this.store.dispatch(
            PlaylistActions.setFavorites({
                channelIds: favorites.map((item) => item.id),
            })
        );
    }

    ngOnDestroy() {
        this.store.dispatch(PlaylistActions.setChannels({ channels: [] }));
    }

    groupsComparator = (a: KeyValue<string, any[]>, b: KeyValue<string, any[]>): number => {
        const numA = parseInt(a.key.replace(/\D/g, ''));
        const numB = parseInt(b.key.replace(/\D/g, ''));

        if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB;
        }

        return a.key.localeCompare(b.key);
    }
}
