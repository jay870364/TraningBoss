import { Type, StaticProvider, Injector } from '@angular/core';
export class PlatformProvider<T> {
  public provide: any;
  public provider: StaticProvider;
  static isProvider(obj: Object): obj is PlatformProvider<any> {
    return obj.hasOwnProperty('provide') && obj.hasOwnProperty('provider');
  }
  constructor(provider: StaticProvider)
  constructor(provide: constructorof<T> | Type<T>, deps: any[])
  constructor(provide: constructorof<T> | Type<T> | StaticProvider, deps?: any[]) {
    if (typeof provide === 'function') {
      this.provide = provide;
      this.provider = {
        provide: provide,
        deps: deps || []
      };
    } else {
      if (!(provide instanceof Array)) {
        this.provide = provide.provide;
      }
      this.provider = provide;
    }
  }
  public get(baseInjector?: Injector): T {
    if (baseInjector) {
      return baseInjector.get(this.provide, Injector.create([this.provider], baseInjector).get(this.provide));
    } else {
      return Injector.create([this.provider], baseInjector).get(this.provide);
    }
  }

}
