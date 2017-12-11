import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Router } from '@angular/router';

export interface ILogin {
  AccountSystemId?: number;
  SystemCode?: string;
  UserId?: number;
  AccountId?: number;
  Name?: string;
  Token?: string;
  Permissions?: string[];
}
@Injectable()
export class Identity {

  protected key = 'identityToken';
  public logined: BehaviorSubject<boolean>;
  public get isLogined(): boolean {
    return this._identity !== null && this._identity !== undefined && this.checkIdentityValid();
  }
  protected _identity: ILogin;
  public get identity(): ILogin {
    return this._identity;
  }
  checkIdentityValid(): any {
    return this._identity.AccountId && this._identity.SystemCode && this._identity.AccountSystemId && this._identity.Name && this._identity.Token && this._identity.UserId
  }
  public login(value: ILogin) {
    this._identity = value;
    localStorage.setItem(this.key, JSON.stringify(value));
    this.logined.next(this.isLogined);
  }
  public logout() {
    localStorage.removeItem(this.key);
    this._identity = null;
    this.logined.next(this.isLogined);
  }
  constructor() {
    this.logined = new BehaviorSubject(this.isLogined);
    const saved = localStorage.getItem(this.key);
    if (saved) {
      this._identity = JSON.parse(saved);
      this.logined.next(true);
    }

  }
}
