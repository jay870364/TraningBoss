import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Injectable()
export class BossQueryStatus {
  protected get filterStorage() {
    return window['__BossQueryStatus'];
  }
  protected set filterStorage(value: any) {
    window['__BossQueryStatus'] = value;
  }
  protected get pagingStorage() {
    return window['__BossPagingQueryStatus'];
  }
  protected set pagingStorage(value: any) {
    window['__BossPagingQueryStatus'] = value;
  }
  public clear() {
    this.filterStorage = {};
  }
  public getStatus(): any {
    return this.filterStorage[location.pathname] || {};
  }
  public replaceStatus(status: any) {
    this.filterStorage[location.pathname] = status;
  }
  public getPagingStatus(): any {
    return this.pagingStorage[location.pathname] || {};
  }
  public replacePagingStatus(status: any) {
    this.pagingStorage[location.pathname] = status;
  }
  constructor() {
    if (!this.filterStorage) {
      this.filterStorage = {};
      this.pagingStorage = {};
    }
  }
}
