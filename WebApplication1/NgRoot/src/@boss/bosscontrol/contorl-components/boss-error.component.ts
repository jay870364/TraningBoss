import { Component } from '@angular/core';

@Component({
  selector: 'boss-error',
  template: `<span><ng-content></ng-content></span>`,
  styles: [`span{color:red;font-size: 75%;}`]
})
export class BossErrorComponent {

}
