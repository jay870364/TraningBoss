import { PlatformProvider } from './../../PlatformProvider';
import { Injectable, Injector, StaticProvider } from '@angular/core';
import { IBossActionButton } from '../../decorator/IBossActionButton';
export class ActionButton {

  public createButtons(providers: PlatformProvider<IBossActionButton<any>>[], injector: Injector) {
    const actionInjector = Injector.create(providers.map(x => x.provider), injector);
    return providers.map(a => a.get(actionInjector));
  }
}
