import { BossGridFieldComponent } from './boss-grid-field.component';
import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { BOSS_GRID_FILED } from './tokens';
import { I18N_NAMESPACE } from '../../StringKeys';
@Component({
  selector: 'boss-grid-enum-field',
  templateUrl: 'boss-grid-enum-field.component.html',
  providers: [{ provide: BOSS_GRID_FILED, useExisting: forwardRef(() => BossGridEnumFieldComponent) }]
})
export class BossGridEnumFieldComponent extends BossGridFieldComponent {
  @Input() public enumType: any;
  public i18nKey = I18N_NAMESPACE;
}
