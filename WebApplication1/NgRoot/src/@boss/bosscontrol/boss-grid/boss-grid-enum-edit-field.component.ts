import { BossGridFieldComponent } from './boss-grid-field.component';
import { Component, forwardRef, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { BOSS_GRID_FILED } from './tokens';
import { EnumHelpers } from '@boss/EnumHelpers';
import { MAT_PLACEHOLDER_GLOBAL_OPTIONS } from '@angular/material';
import { BossGridEditFieldComponent } from './boss-grid-edit-field.component';
import { I18N_NAMESPACE } from '../../StringKeys';
@Component({
  selector: 'boss-grid-enum-edit-field',
  templateUrl: 'boss-grid-enum-edit-field.component.html',
  providers: [{ provide: BOSS_GRID_FILED, useExisting: forwardRef(() => BossGridEnumEditFieldComponent) },
  { provide: MAT_PLACEHOLDER_GLOBAL_OPTIONS, useValue: { float: 'never' } }]
})
export class BossGridEnumEditFieldComponent extends BossGridEditFieldComponent {

  protected _enumType: Object;
  @Input() public set enumType(value: Object) {
    this._enumType = value;
    const data = EnumHelpers.ConvertToBossComponentData(value);
    this.options = data.options;
    this.optionsI18nNamespace = data.optionsI18nNamespace;
  }
  public get enumType() { return this._enumType; }
  public i18nKey = I18N_NAMESPACE;
  public options;
  public optionsI18nNamespace;

}
