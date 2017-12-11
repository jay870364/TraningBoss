import { Component, Input, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
@Component({
    selector: 'boss-image-cropper',
    templateUrl: './boss-image-cropper.component.html',
    styleUrls: ['./boss-image-cropper.component.scss']
})
export class BossImageCropperComponent {
    public croppedData: any = {};
    public settings: CropperSettings;
    constructor( @Inject(MAT_DIALOG_DATA) public data: { image: HTMLImageElement, width: number, height: number, message: string }) {
        this.settings = new CropperSettings();
        this.settings.width = data.width;
        this.settings.height = data.height;
        this.settings.croppedWidth = data.width;
        this.settings.croppedHeight = data.height;
        this.settings.canvasWidth = 400;
        this.settings.canvasHeight = 400;
        this.settings.rounded = false;
        this.settings.keepAspect = true;
        this.settings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.settings.cropperDrawSettings.strokeWidth = 1;
        this.settings.noFileInput = true;
    }

}
