

import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'boss-layout',
  template: `<ng-content></ng-content>`,
  styleUrls: ['boss-layout.component.scss']
})
export class BossLayoutComponent {
  @Input() @HostBinding('class.hidden') public hidden: boolean;
}
