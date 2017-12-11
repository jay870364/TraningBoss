import { Component, EventEmitter, Output, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'boss-message',
  templateUrl: './boss-message.component.html',
})
export class BossMessageComponent {
  @Input() public message: string;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = data || '';
  }

}
