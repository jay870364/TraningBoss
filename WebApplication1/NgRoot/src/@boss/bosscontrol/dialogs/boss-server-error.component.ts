import { Component, EventEmitter, Output, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { IBackendException } from '../../services/http/IBackendException';
import { environment } from 'environments/environment';

@Component({
  selector: 'boss-server-error',
  templateUrl: './boss-server-error.component.html',
})
export class BossServerErrorComponent {
  public detail = !environment.production;
  public modelState: { field: string, errors: string[] }[];
  constructor( @Inject(MAT_DIALOG_DATA) public message: IBackendException) {
    if (message.ModelState) {
      this.modelState = Object.keys(message.ModelState).map(x => {
        return {
          field: x,
          errors: message.ModelState[x]
        }
      })
    }
  }
}
