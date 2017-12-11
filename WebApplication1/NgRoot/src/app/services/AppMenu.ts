import { Injectable } from '@angular/core';
import { IMenuItem } from '@boss/platform/menuItem';
import { Identity } from '@boss/services/Identity';
import { DataSourceFactory } from '@boss/services/datasource/DataSourceFactory';
import { MenuProvider } from '@boss/platform/MenuProvider';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { UserMenuItem } from '../models/UserMenuItem';
@Injectable()
export class AppMenu implements MenuProvider {
  public menu: Observable<IMenuItem[]>;
  constructor(protected identity: Identity, protected dafac: DataSourceFactory) {
    const subject = new Subject<IMenuItem[]>();
    this.menu = subject.asObservable();
    identity.logined.subscribe(logined => {
      if (logined) {
        dafac.getDataSource(UserMenuItem).toSubject().first().subscribe(x => subject.next(x.data as any));
      } else {
        subject.next([]);
      }
    })
  }
}
