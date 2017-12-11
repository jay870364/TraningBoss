

import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'boss-row',
  template: `<ng-content></ng-content>`,
  styleUrls: ['boss-row.component.scss']
})
export class BossRowComponent {
  @Input() @HostBinding('class.hidden') public hidden: boolean;

}
