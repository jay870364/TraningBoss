import { BossGridFieldComponent } from './boss-grid-field.component';
import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { IBossActionButton } from '../../decorator/IBossActionButton';
import { BOSS_GRID_FILED } from './tokens';



@Component({
  selector: 'boss-grid-action-field',
  templateUrl: 'boss-grid-action-field.component.html',
  providers: [{ provide: BOSS_GRID_FILED, useExisting: forwardRef(() => BossGridActionFieldComponent) }]
})
export class BossGridActionFieldComponent extends BossGridFieldComponent {
  @Input() actions: IBossActionButton<any>[];

  onSetup() {
    super.onSetup();
    setTimeout(() => {
      this.width = (this.actions.filter(x => x.visible).length * 70) + 'px';
    })
  }
}
