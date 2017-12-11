import { OdataDataSource } from './odata/OdataDataSource';
import { Http } from '@angular/http';
import { MemoryDatasource } from './memory/MemoryDatasource';
import { IDataSource } from './IDataSource';
export class DataSourceFactory {
  constructor(private http: Http) {

  }
  getDataSource<T>(ctor: T[]): MemoryDatasource<T>
  getDataSource<T>(ctor: constructorof<T> | string): OdataDataSource<T>
  getDataSource<T>(ctor: constructorof<T> | string | T[]): IDataSource<T> {
    if (typeof ctor === 'function' || typeof ctor === 'string') {
      return new OdataDataSource<T>(this.http, ctor);
    } else if (ctor instanceof Array) {
      return new MemoryDatasource(ctor);
    }
    throw Error('not support type');
  }
}


