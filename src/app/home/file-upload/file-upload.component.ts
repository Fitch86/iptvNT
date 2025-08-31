import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { DragDropFileUploadDirective } from './drag-drop-file-upload.directive';

@Component({
    imports: [DragDropFileUploadDirective, MatIconModule, TranslatePipe],
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
    @Output() fileSelected = new EventEmitter<{
        uploadEvent: Event;
        file: File;
    }>();
    @Output() fileRejected = new EventEmitter<string>();
    @Output() addClicked = new EventEmitter<void>();
    @Output() closeDialog = new EventEmitter<void>();

    private readonly store = inject(Store);

    allowedContentTypes = [
        'application/mpegurl',
        'application/x-mpegurl',
        'application/octet-stream',
        'application/vnd.apple.mpegurl',
        'application/vnd.apple.mpegurl.audio',
        'audio/x-mpegurl',
        'audio/mpegurl',
    ];

    openDialog(fileField: HTMLInputElement) {
        // Web version - use file input
        fileField.click();
    }

    upload(fileList: FileList) {
        if (!this.allowedContentTypes.includes(fileList[0].type)) {
            this.fileRejected.emit(fileList[0].name);
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = (uploadEvent) =>
            this.fileSelected.emit({
                uploadEvent,
                file: fileList[0],
            });
        fileReader.readAsText(fileList[0]);
        this.addClicked.emit();
    }
}
