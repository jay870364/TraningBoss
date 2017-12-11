import { Injectable, Optional, Inject } from '@angular/core';
import { PLATFORM_MODULE_NAME, PLATFORM_FUNCTION_NAME } from '../Tokens';
import { ActivatedRoute } from '@angular/router';
import { Identity } from '../../services/Identity';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { ValueOrArray } from '../../ValueOrArray';
import { ValueOrArrayResolver } from '../../ValueOrArrayResolver';
@Injectable()
export class UserRole {
  public moduleName: ValueOrArray<string>;
  public functionName: string;
  public permissions: { [role: string]: boolean };
  public hasRole(role: string): boolean {
    if (!this.identity.isLogined) {
      return false;
    }
    if (!role) {
      console.warn(`check role= ${role}`);
    }
    if (this.permissions[`${this.identity.identity.AccountSystemId}.${role}`]) {
      return true;
    } else {
      let result = false;
      new ValueOrArrayResolver(this.moduleName).array.every((moduleName) => {
        if (this.permissions[`${this.identity.identity.AccountSystemId}.${moduleName}.${this.functionName}.${role}`]) {
          result = true;
          return false;
        }
        return true;
      });
      return result;
    }
  }
  constructor(route: ActivatedRoute, protected identity: Identity,
    @Optional() @Inject(PLATFORM_MODULE_NAME) moduleName: ValueOrArray<string>,
    @Optional() @Inject(PLATFORM_FUNCTION_NAME) functionName: ValueOrArray<string>) {
    this.moduleName = (route.snapshot.data['moduleName'] as ValueOrArray<string>) || moduleName;
    this.functionName = route.snapshot.data['functionName'] || functionName;
    this.permissions = {};
    if (identity.identity) {
      identity.identity.Permissions.forEach(x => this.permissions[x] = true);
    }
  }
}
