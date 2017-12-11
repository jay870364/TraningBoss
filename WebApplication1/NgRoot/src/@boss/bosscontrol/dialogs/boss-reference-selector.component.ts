import { PlatformProvider } from '@boss/PlatformProvider';
import { Component, EventEmitter, Output, Input, Inject, AfterViewInit, ViewChild, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BossAutoGridComponent } from '../boss-auto-grid/boss-auto-grid.component';
import { IBossActionButton } from '../../decorator/IBossActionButton';


@Injectable()
class SelectButton implements IBossActionButton<any> {
  public visible = true;
  enabled = true;
  text = 'BossControl.選擇';
  constructor(protected dialog: MatDialogRef<any>) {

  }
  click($event, entry, key) {
    this.dialog.close(key);
  }
}

@Component({
  selector: 'boss-reference-selector',
  styleUrls: ['./boss-reference-selector.component.scss'],
  templateUrl: './boss-reference-selector.component.html'
})
export class BossReferenceSelectorComponent {
  @Input() public message: string;
  @Input() public modelType;
  public actions = [new PlatformProvider(SelectButton, [MatDialogRef])];
  constructor( @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modelType = data.modelType;
    this.message = data.message;

  }
}
