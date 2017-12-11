import { Component, EventEmitter, Output, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { IServerMessage } from '../../services/http/IServerMessage';
import { environment } from 'environments/environment';

@Component({
  selector: 'boss-server-message',
  templateUrl: './boss-server-message.component.html',
})
export class BossServerMessageComponent {
  constructor( @Inject(MAT_DIALOG_DATA) public message: IServerMessage) {

  }
  public getFieldName(x: string) {
    return x.indexOf('+') >= 0 ? x.replace(/\+/g, '.') : x;
  }
}
