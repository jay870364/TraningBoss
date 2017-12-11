import { Injectable } from '@angular/core';
@Injectable()
export class ExtensionData {
  [key: string]: any;
  public getOrNew<T>(ctor: constructorof<T>, key: string): T {
    if (!this[key]) {
      this[key] = new ctor();
    }
    return this[key];
  }
}
