import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Type } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Response, QueryEncoder } from '@angular/http';
import { IDataSource, FilterDelegate } from '../IDataSource';
import { DataSourceResponse } from '../DataSourceResponse';
import { QueryOptions } from '../QueryOptions';
import { OdataUrlBuilder } from './OdataUrlBuilder';
import { IDatasourceFilter, IFilterOperator } from '../IDatasourceFilter';
import { DatasourceOrder } from '../DatasourceOrder';
import { OdataFilter } from './OdataFilter';
import { IHttpDataSource } from '../IHttpDataSource';
import { IBossApiModel } from '@boss/decorator/BossApiModel';
export class CustomQueryEncoderHelper extends QueryEncoder {
  encodeKey(k: string): string {
    k = super.encodeKey(k);
    return k.replace(/\+/gi, '%2B');
  }
  encodeValue(v: string): string {
    v = super.encodeValue(v);
    return v.replace(/\+/gi, '%2B');
  }
}
export class OdataDataSource<T> implements IDataSource<T>, IHttpDataSource<T> {
  public identityProperty: string;
  public porperties: { [property: string]: string };
  constructor(private http: Http, private ctor: constructorof<T> | string, public queryOptions?: QueryOptions, identityProperty?: string) {
    if (!this.queryOptions) {
      this.queryOptions = new QueryOptions();
    }
    if (identityProperty) {
      this.identityProperty = identityProperty;
    } else if ((<IBossApiModel><any>ctor).apiModel) {
      const apiModel = (<IBossApiModel><any>ctor).apiModel;
      this.identityProperty = apiModel.identityProperty;
      this.queryOptions.expand = this.combineProperty(this.queryOptions.expand, apiModel.expand.map(x => x.replace(/\./g, '/'))).join(',');
      this.queryOptions.select = this.combineProperty(this.queryOptions.select, apiModel.select.map(x => x.replace(/\./g, '/'))).join(',');
    }
    this.porperties = ctor['$$properties'] || {};
  }
  public get apiUrl() {
    if (typeof this.ctor === 'string') {
      return this.ctor;
    } else if (this.ctor['apiModel']) {
      return (<IBossApiModel><any>this.ctor).apiModel.path.replace(/[\/]$/, '');
    }
  }
  public toSubject(): Observable<DataSourceResponse<T>> {
    const requestOptions = new RequestOptions();
    const params: URLSearchParams = new URLSearchParams(undefined, new CustomQueryEncoderHelper());
    const odataUrlBuilder = new OdataUrlBuilder(this.queryOptions.clone());
    odataUrlBuilder.apply(params);
    requestOptions.params = params;
    const subject = new Subject<DataSourceResponse<T>>();
    let observ$: Observable<Response>;
    observ$ = this.http.get(this.apiUrl, requestOptions);
    observ$.map(r => {
      let count: number;
      const hc = r.headers.get('X-Odata-Data-Length');
      if (hc) {
        count = parseInt(hc, 10);
      }
      return new DataSourceResponse(r.json(), count);
    }).subscribe(subject);
    return subject;
  }

  public skip(n: number): OdataDataSource<T> {
    const next = this.queryOptions.clone();
    next.skip = n;
    return new OdataDataSource(this.http, this.ctor, next, this.identityProperty);
  }
  public take(n: number): OdataDataSource<T> {
    const next = this.queryOptions.clone();
    next.take = n;
    return new OdataDataSource(this.http, this.ctor, next, this.identityProperty);
  }
  public orderby(property: string, direction?: 'asc' | 'desc'): OdataDataSource<T> {
    const next = this.queryOptions.clone();
    next.orderby.push(new DatasourceOrder(property, direction));
    return new OdataDataSource(this.http, this.ctor, next, this.identityProperty);
  }
  protected combineProperty(a: string[] | string, b: string[]): string[] {
    if (!a) { return b; }
    if (typeof a === 'string') {
      a = a.split(',');
    }
    return a.concat(b.filter(x => a.indexOf(x) === -1));
  }
  public select(properties: string) {
    if (properties) {
      properties = properties.replace(/\./g, '/');
    }
    const next = this.queryOptions.clone();
    const old = next.select.split(',').filter(x => x).map(x => x.replace(/^\s+|^\s*\,|\s+$|\s*\,$/g, ''));
    const news = properties.split(',').map(x => x.replace(/^\s+|^\s*\,|\s+$|\s*\,$/g, ''));
    next.select = this.combineProperty(old, news).join(',');
    return new OdataDataSource(this.http, this.ctor, next, this.identityProperty);
  }
  public include(properties: string) {
    if (properties) {
      properties = properties.replace(/\./g, '/');
    }
    const next = this.queryOptions.clone();
    const old = next.expand.split(',').filter(x => x);
    next.expand = old.concat(properties.split(',').map(x => x.replace(/^\s+|^\s*\,|\s+$|\s*\,$/g, '')).filter(x => old.indexOf(x))).join(',');
    return new OdataDataSource(this.http, this.ctor, next, this.identityProperty);
  }
  /**
   * add filter to request
   * @param property
   * @param operator
   * @param parameter
   */
  public where(property: string, operator: '>' | '>=' | '<' | '<=', parameter: Date | number): OdataDataSource<T>;
  public where(property: string, operator: '=' | '!=', parameter: Date | number | string | boolean): OdataDataSource<T>;
  public where(property: string, operator: 'in', parameter: Date[] | number[] | string[]): OdataDataSource<T>;
  public where(property: string, operator: 'contains' | 'startswith' | 'endwith', parameter: string): OdataDataSource<T>;
  public where(filter: IDatasourceFilter | string): OdataDataSource<T>;
  public where(filter: string | IDatasourceFilter | OdataFilter | FilterDelegate<T>, operator?: IFilterOperator, parameter?: any): OdataDataSource<T> {
    if (typeof filter === 'function') {
      throw Error('not support delegate');
    }
    const next = this.queryOptions.filterLogic.clone();
    if (typeof filter === 'object') {
      filter['propertyType'] = this.porperties[filter.property];
      next.filters.push(filter);
    } else if (typeof filter === 'string' && arguments.length > 1) {
      const f = new OdataFilter(filter, operator, parameter);
      f.propertyType = this.porperties[filter];
      next.filters.push(f);
    } else if (typeof filter === 'string') {
      next.filters.push(filter);
    }
    return new OdataDataSource(this.http, this.ctor, this.queryOptions.clone(next), this.identityProperty);
  }
  public clone(): IDataSource<T> {
    return new OdataDataSource(this.http, this.ctor, this.queryOptions.clone(), this.identityProperty);
  }
  private subjectSubscribe(observ$: Observable<T>): Subject<T> {
    const subject = new Subject<T>();
    observ$.subscribe(subject);
    return subject;
  }
  public compineUrl(url: string, ...append: string[]) {
    const urlParts = url.split('?');
    urlParts[0] = urlParts[0].replace(/[\/]$/, '');
    urlParts[0] += `/${append.join('/')}`;
    if (urlParts[1]) {
      urlParts[1] = `?${urlParts[1]}`;
    }
    return urlParts.join('');
  }
  public get(key: any): Observable<T> {
    return this.http.get(this.compineUrl(this.apiUrl, key)).map(r => r.json());
  }
  public delete(key: any): Observable<T> {
    return this.subjectSubscribe(this.http.delete(this.compineUrl(this.apiUrl, key)).map(r => r.json()));
  }
  public update(key: any, model: T): Observable<T> {
    return this.subjectSubscribe(this.http.put(this.compineUrl(this.apiUrl, key), model).map(r => r.json()));
  }
  public create(model: T): Observable<T> {
    return this.subjectSubscribe(this.http.post(this.apiUrl, model).map(r => r.json()));
  }
}
