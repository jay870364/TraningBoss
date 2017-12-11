import { Component, Input, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'boss-confirm-file',
    templateUrl: './boss-confirm-file.component.html',
    styleUrls: ['./boss-confirm-file.component.scss']
})
export class BossConfirmFileComponent implements OnDestroy {
    public files: { file: File, ext: string, isImage: boolean }[];
    protected urls = [];
    public getImageUrl(file: File) {
        const url = URL.createObjectURL(file);
        this.urls.push(url);
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }
    ngOnDestroy() {
        this.urls.forEach(x => URL.revokeObjectURL(x));
    }
    constructor( @Inject(MAT_DIALOG_DATA) public data: { files: File[] }, protected sanitizer: DomSanitizer) {
        this.files = data.files.map(f => {
            const fp = f.name.split('.');
            const ext = (fp.length >= 2 ? fp[fp.length - 1] : '').toLowerCase();
            return {
                file: f,
                ext: ext,
                isImage: /image\//i.test(f.type)
            }
        });
    }

}
