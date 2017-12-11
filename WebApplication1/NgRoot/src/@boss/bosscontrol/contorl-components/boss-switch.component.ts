import { Component, OnInit, Input } from '@angular/core';
import { BossAutoFormControl } from './BossAutoFormControl';

@Component({
  selector: 'boss-switch',
  templateUrl: './boss-switch.component.html',
  styleUrls: ['./boss-switch.component.scss']
})
export class BossSwitchComponent extends BossAutoFormControl {
  @Input() public required: boolean;
  @Input() public title: string;
}
