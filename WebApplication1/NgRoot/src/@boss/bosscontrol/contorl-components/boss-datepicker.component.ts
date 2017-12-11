import { Component, OnInit, Input } from '@angular/core';
import { BossAutoFormControl } from './BossAutoFormControl';

@Component({
  selector: 'boss-datetimepicker',
  templateUrl: './boss-datepicker.component.html',
  styles: [`mat-datepicker{display:none;}`]
})
export class BossDatepickerComponent extends BossAutoFormControl {

  @Input() public required: boolean;
  @Input() public hint: string;

}
