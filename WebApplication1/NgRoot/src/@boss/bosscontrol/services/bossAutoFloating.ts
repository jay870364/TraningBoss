import { Injectable, ElementRef } from '@angular/core';
import { BossAutoFloatingDirective } from '../boss-auto-floating/boss-auto-floating.directive';
export interface IBossAutoFloatingElement {
  elements: BossAutoFloatingDirective[];
  hostElement: ElementRef
}
@Injectable()
export class BossAutoFloating {
  key = 'g_BossAutoFloating';
  public get reference() {
    if (!(this.key in window)) {
      window[this.key] = {}
    }
    return window[this.key] as { [name: string]: IBossAutoFloatingElement };
  }
  public addFloatingElement(hostName: string, element: BossAutoFloatingDirective) {
    if (hostName in this.reference) {
      this.reference[hostName].elements.push(element);
    }
  }
  public removeFloatingElement(hostName: string, element: BossAutoFloatingDirective) {
    if (hostName in this.reference) {
      this.reference[hostName].elements.splice(this.reference[hostName].elements.indexOf(element), 1);
    }
  }
}
