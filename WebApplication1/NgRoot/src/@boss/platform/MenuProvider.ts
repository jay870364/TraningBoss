import { Observable } from 'rxjs/Observable';
import { IMenuItem } from './menuItem';
import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
@Injectable()
export class MenuProvider {
  public menu: Observable<IMenuItem[]> = Observable.of([]);
}
