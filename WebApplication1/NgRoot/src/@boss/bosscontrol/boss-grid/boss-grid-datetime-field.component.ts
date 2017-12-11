import { BossGridFieldComponent } from './boss-grid-field.component';
import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { BOSS_GRID_FILED } from './tokens';
import { DateFormat } from '../../DateFormat';
@Component({
  selector: 'boss-grid-datetime-field',
  templateUrl: 'boss-grid-datetime-field.component.html',
  providers: [{ provide: BOSS_GRID_FILED, useExisting: forwardRef(() => BossGridDatetimeFieldComponent) }]
})
export class BossGridDatetimeFieldComponent extends BossGridFieldComponent {
  static diff: number;
  @Input() public format = DateFormat.yMMddHHmmss;
  @Input() public toLocal = true;
  public get timeZoneOffset() {
    if (!this.toLocal) {
      return 0;
    }
    if (!BossGridDatetimeFieldComponent.diff) {
      BossGridDatetimeFieldComponent.diff = new Date().getTimezoneOffset() * -1;
    }
    return BossGridDatetimeFieldComponent.diff;
  }
}
