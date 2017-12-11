import { PlatformProvider } from './../../PlatformProvider';
import { IHttpDataSource } from '@boss/services/datasource/IHttpDataSource';
import { Injector, Provider, StaticProvider } from '@angular/core';
export interface IListLoader<T> {
  loader(source: IHttpDataSource<T>, load: (source: IHttpDataSource<T>) => void);
}
export class ListLoader implements IListLoader<any> {
  loader(source, load) {
    load(source)
  }
}
export class ListLoaderFactory {
  createLoader(constor: PlatformProvider<IListLoader<any>>, injector: Injector) {
    if (!constor) {
      return injector.get(ListLoader);
    }
    return constor.get(injector);
  }
}

