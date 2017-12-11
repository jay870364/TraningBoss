import { Component, OnInit, Input } from '@angular/core';
import { BossAutoFormControl } from './BossAutoFormControl';

@Component({
  selector: 'boss-textbox',
  templateUrl: './boss-textbox.component.html',
  styleUrls: ['./boss-textbox.component.scss']
})
export class BossTextboxComponent extends BossAutoFormControl {

  @Input() public required: boolean;
  @Input() public hint: string;
  @Input() public type = 'text';
}
