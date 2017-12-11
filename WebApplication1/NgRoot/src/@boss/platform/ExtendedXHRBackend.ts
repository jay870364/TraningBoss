import { Injectable } from '@angular/core';
import { Request, XHRBackend, BrowserXhr, ResponseOptions, XSRFStrategy, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppConfiguration } from './app.configuraton';
import { HttpStatus } from '@boss/services/http/HttpStatus';
import { Identity } from '../services/Identity';


@Injectable()
export class ExtendedXHRBackend extends XHRBackend {
  constructor(browserXhr: BrowserXhr, baseResponseOptions: ResponseOptions, xsrfStrategy: XSRFStrategy,
    protected config: AppConfiguration, protected httpStatus: HttpStatus, protected identity: Identity) {
    super(browserXhr, baseResponseOptions, xsrfStrategy);
    httpStatus.tokenRenew.subscribe(token => identity.identity.Token = token);
  }
  private fixUrl(url: string): string {
    if (!/^(?:https?:)?\/\//.test(url)) {
      return `${this.config.apiEndpoint.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
    }
    return url;
  }
  createConnection(request: Request) {
    request.headers.set('X-Backend', 'ExtendedXHRBackend');
    request.headers.set('X-Odata-Data-Length', '?');
    request.headers.set('Cache-Control', 'no-cache');
    request.headers.set('Pragma', 'no-cache');

    if (this.identity.isLogined) {
      const login = this.identity.identity;
      request.headers.set('Authorization', login.Token);
      request.headers.set('x-account-system', login.AccountSystemId.toFixed(0));
    }
    request.url = this.fixUrl(request.url);
    const xhrConnection = super.createConnection(request);
    if (!/#.*noloadingscreen/.test(request.url)) {
      this.httpStatus.addRequest(xhrConnection);
    }
    this.httpStatus.dialogWhenError(xhrConnection);


    return xhrConnection;

  }
}
