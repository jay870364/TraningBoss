import { BossGridFieldComponent } from './boss-grid-field.component';
import { Inject, forwardRef, Host, Optional, OnDestroy, Component, Injector } from '@angular/core';
import { BossGridComponent } from './boss-grid.component';
import { ExtensionData } from './services/ExtensionData';
import { BossAutoGridEdit } from '../services/BossAutoGridEdit';
import { Guid } from '@boss/Guid';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { DataSourceResponse } from '../../services/datasource/DataSourceResponse';
import { BossEditForm } from '@boss/bosscontrol/services/form/BossEditForm';
import { Identity } from '../../services/Identity';
import { BOSS_GRID_FILED } from './tokens';
import { MAT_PLACEHOLDER_GLOBAL_OPTIONS } from '@angular/material';
@Component({
  selector: 'boss-grid-edit-field',
  template: '',
  providers: [{ provide: BOSS_GRID_FILED, useExisting: forwardRef(() => BossGridEditFieldComponent) },
  { provide: MAT_PLACEHOLDER_GLOBAL_OPTIONS, useValue: { float: 'never' } }]
})
export class BossGridEditFieldComponent extends BossGridFieldComponent implements OnDestroy {
  public editing = false;
  protected subs: Subscription[] = [];
  constructor( @Inject(Identity) identity: Identity, @Inject(forwardRef(() => BossGridComponent)) @Host() @Optional() public grid: BossGridComponent,
    @Inject(ExtensionData) @Host() @Optional() public extensionData: ExtensionData, @Optional() public autoGridEdit: BossAutoGridEdit, injector: Injector) {
    super(identity, grid, extensionData, injector);
  }

  onSetup() {
    this.subs.push(this.fieldStatus.subscribe(x => {
      this.editing = x.editing;
    }))
  }
  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }
}
