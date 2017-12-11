import { Component, OnInit, Input } from '@angular/core';
import { BossAutoFormControl } from './BossAutoFormControl';

@Component({
  selector: 'boss-form-grid',
  templateUrl: './boss-form-grid.component.html',
  styleUrls: ['./boss-form-grid.component.scss']
})
export class BossFormGridComponent extends BossAutoFormControl {
  @Input() public required: boolean;

}
