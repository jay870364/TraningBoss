import { Component } from '@angular/core';
const baseStyle = `
  :host{
    padding: 4px;
    display:flex;
    flex:1;
   }`;
@Component({
  selector: 'boss-grid-footer',
  template: '<ng-content></ng-content>',
  styles: [baseStyle]
})
export class BossGridFooterComponent { }

@Component({
  selector: 'boss-grid-header',
  template: '<ng-content></ng-content>',
  styles: [baseStyle]
})
export class BossGridHeaderComponent { }

@Component({
  selector: 'boss-grid-empty',
  template: '<ng-content></ng-content>',
  styles: [
    baseStyle,
    `:host /deep/ {
      justify-content: center;
      align-items: center;
    }`
  ]
})
export class BossGridEmptyComponent { }
