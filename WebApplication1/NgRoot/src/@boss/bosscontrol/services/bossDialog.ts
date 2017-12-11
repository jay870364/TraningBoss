import { Injectable, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BossConfirmComponent } from '../dialogs/boss-confirm.component';
import { BossMessageComponent } from '../dialogs/boss-message.component';
import { BossReferenceSelectorComponent } from '../dialogs/boss-reference-selector.component';
import { IBackendException } from '../../services/http/IBackendException';
import { BossServerErrorComponent } from '../dialogs/boss-server-error.component';
import { IServerMessage } from '../../services/http/IServerMessage';
import { BossServerMessageComponent } from '../dialogs/boss-server-message.component';
@Injectable()
export class BossDialog {
  constructor(protected dialog: MatDialog) {

  }
  public confirm(message: string, ok: () => void = () => { }, cancel: () => void = () => { }, viewContainerRef?: ViewContainerRef) {
    this.dialog.open(BossConfirmComponent, {
      data: message,
      viewContainerRef: viewContainerRef
    }).afterClosed().subscribe(result => {
      (result ? ok : cancel)();
    })
  }
  public serverMessage(message: IServerMessage) {
    this.dialog.open(BossServerMessageComponent, {
      data: message
    })
  }
  public serverError(error: IBackendException) {
    this.dialog.open(BossServerErrorComponent, {
      data: error,
    });
  }
  public message(message: string, ok: () => void = () => { }, viewContainerRef?: ViewContainerRef) {
    this.dialog.open(BossMessageComponent, {
      data: message,
      viewContainerRef: viewContainerRef
    }).afterClosed().subscribe(() => {
      ok();
    })
  }
  public referenceSelector<T>(message: string, modelType: constructorof<T>, ok: (entry: T) => void, cancel: () => void = () => { }, viewContainerRef?: ViewContainerRef) {
    this.dialog.open(BossReferenceSelectorComponent, {
      data: {
        message: message,
        modelType: modelType
      },
      viewContainerRef: viewContainerRef,
      width: '80%'
    }).afterClosed().subscribe(result => {
      if (result !== null && result !== undefined) {
        ok(result);
      } else {
        cancel();
      }
    })
  }
}
