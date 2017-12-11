import { BossGridFieldComponent } from './boss-grid-field.component';
import { Component, forwardRef, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { BOSS_GRID_FILED } from './tokens';
import { MAT_PLACEHOLDER_GLOBAL_OPTIONS } from '@angular/material';
import { BossGridEditFieldComponent } from './boss-grid-edit-field.component';
@Component({
  selector: 'boss-grid-textarea-edit-field',
  templateUrl: 'boss-grid-textarea-edit-field.component.html',
  providers: [{ provide: BOSS_GRID_FILED, useExisting: forwardRef(() => BossGridTextareaEditFieldComponent) },
  { provide: MAT_PLACEHOLDER_GLOBAL_OPTIONS, useValue: { float: 'never' } }]
})
export class BossGridTextareaEditFieldComponent extends BossGridEditFieldComponent {
  verticalAlign = 'top';
}
