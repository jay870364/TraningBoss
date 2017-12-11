import { Component, OnInit, Input } from '@angular/core';
import { BossAutoFormControl } from './BossAutoFormControl';

@Component({
  selector: 'boss-password',
  templateUrl: './boss-password.component.html',
  styleUrls: ['./boss-password.component.scss']
})
export class BossPasswordComponent extends BossAutoFormControl {

  @Input() public required: boolean;
  @Input() public hint: string;

}
