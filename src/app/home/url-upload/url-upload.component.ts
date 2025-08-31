import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-url-upload',
    templateUrl: './url-upload.component.html',
    imports: [MatButton, MatInputModule, ReactiveFormsModule, TranslatePipe],
})
export class UrlUploadComponent implements OnInit {
    private readonly fb = inject(FormBuilder);

    /** Emits playlist data to the parent component on form submit */
    @Output() urlAdded: EventEmitter<{url: string, userAgent?: string}> = new EventEmitter();

    form: FormGroup;

    ngOnInit() {
        const urlRegex = '(https?://.*?)';
        this.form = this.fb.group({
            playlistUrl: [
                '',
                [Validators.required, Validators.pattern(urlRegex)],
            ],
            userAgent: [''],
        });
    }

    onSubmit() {
        if (this.form.valid) {
            const formValue = this.form.value;
            this.urlAdded.emit({
                url: formValue.playlistUrl,
                userAgent: formValue.userAgent || undefined
            });
        }
    }
}
