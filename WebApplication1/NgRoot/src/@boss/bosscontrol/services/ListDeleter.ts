import { PlatformProvider } from './../../PlatformProvider';
import { IHttpDataSource } from '@boss/services/datasource/IHttpDataSource';
import { Injector, Provider, Injectable, StaticProvider } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BossDialog } from './bossDialog';
export interface IListDeleter<T> {
  delete: (model: T, identity: any, datasource: IHttpDataSource<T>, success: (model: T) => void, cancel: () => void) => void;
}
@Injectable()
export class ListDeleter implements IListDeleter<any> {
  constructor(protected dialog: BossDialog) {

  }
  delete = (model: any, identity: any, datasource: IHttpDataSource<any>, success: (model: any) => void, cancel: () => void) => {
    this.dialog.confirm('BossControl.確認刪除', () => {
      datasource.delete(identity).subscribe(deleted => success(deleted));
    }, () => cancel());
  }
}
export class ListDeleterFactory {
  createLoader(provider: PlatformProvider<IListDeleter<any>>, injector: Injector) {
    if (!provider) {
      return injector.get(ListDeleter);
    }
    return provider.get(injector);
  }
}

