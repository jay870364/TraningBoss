import { Injectable, Pipe } from '@angular/core';
import { Request, Response } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { IBackendException } from './IBackendException';
import { IServerMessage } from './IServerMessage';
export interface IHttpConnection {
  request: Request;
  response: Observable<Response>
}
@Injectable()
export class HttpStatus {
  protected _needLogin = new Subject();
  protected _error = new Subject<IBackendException>();
  protected _message = new Subject<IServerMessage>();
  protected _tokenRenew = new Subject<string>();
  protected requests = [];
  protected _statusChanged = new BehaviorSubject<number>(0);
  public get statusChanged() {
    return this._statusChanged;
  }
  public get error() {
    return this._error.asObservable();
  }
  public get needLogin() {
    return this._needLogin.asObservable();
  }
  public get message() {
    return this._message.asObservable();
  }
  public get tokenRenew() {
    return this._tokenRenew.asObservable();
  }
  public dialogWhenError(connection: IHttpConnection) {
    connection.response = connection.response.catch((error: Response) => {
      if (error.headers.has('x-platform-server-message') && error.headers.get('x-platform-server-message') === 'Yes') {

      } else {
        if (error.status === 401) {
          this._needLogin.next();
          return Observable.throw(error);
        }
        if ([401, 404, 403].indexOf(error.status) === -1) {
          let errObj: IBackendException;
          try {
            errObj = error.json();
          } catch (ex) {
            errObj = {
              ExceptionType: 'UnknowException',
              Message: 'UnknowException',
              ExceptionMessage: error.text(),
              StackTrace: null
            }
          }
          this._error.next(errObj);
        }
      }
      return Observable.throw(error);
    });
  }
  public addRequest(connection: IHttpConnection) {
    this.requests.push(connection);
    const subj = new Subject<Response>();
    connection.response.subscribe(subj);
    connection.response = subj.first();
    const handler = response => {
      if (response.headers.has('x-platform-token-renew-required')) {
        this._tokenRenew.next(response.headers.get('x-platform-token-renew-required'));
      }
      const index = this.requests.indexOf(connection);
      if (index >= 0) {
        this.requests.splice(index, 1);
        this._statusChanged.next(this.requests.length);
      }
      if (response.headers.has('x-platform-server-message') && response.headers.get('x-platform-server-message') === 'Yes') {
        this._message.next(response.json());
      }
    };
    connection.response.subscribe(handler, handler);
    this._statusChanged.next(this.requests.length);
  }


}

