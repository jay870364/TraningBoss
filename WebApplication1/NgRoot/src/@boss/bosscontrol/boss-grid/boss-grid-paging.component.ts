
import { Component, ContentChildren, QueryList, Input, forwardRef, TemplateRef, ViewChild, ContentChild, Inject, ChangeDetectorRef, Output, Host, Optional, Injector } from '@angular/core';
import { BossGridComponent } from './boss-grid.component';
import { DataSourceResponse } from '../../services/datasource/DataSourceResponse';
import { Observable } from 'rxjs/Observable';
import { BossGridExtensionComponent } from './boss-grid-extension.component';
import { IDataSource } from '../../services/datasource/IDataSource';
import { ExtensionData } from './services/ExtensionData';
import { BOSS_GRID_DEFAULT_PAGESIZE } from './tokens';
import { Identity } from '../../services/Identity';
import { BossQueryStatus } from '@boss/bosscontrol/services/BossQueryStatus';
@Component({
  selector: 'boss-grid>boss-grid-paging',
  templateUrl: './boss-grid-paging.component.html',
  styleUrls: ['./boss-grid-paging.component.scss'],
  providers: [{ provide: BossGridExtensionComponent, useExisting: forwardRef(() => BossGridPagingFooterComponent) }]
})
export class BossGridPagingFooterComponent extends BossGridExtensionComponent {

  @Input() public enabled = true
  @Input() public get page() { return this.pagingData.page; };
  public set page(value: number) {
    if (value >= 1 && value <= this.totalPage) {
      this.pagingData.page = value;
      this.refresh();
    }
  }
  @Input() public pageOptions = [5, 10, 20, 50, 100];

  @Input() public set pageSize(value: number) {
    this.pagingData.pageOptionValue = value;
  }
  public length: number = undefined;
  public pagingData: PagingData;
  public totalPage = 1;
  constructor(protected queryStatus: BossQueryStatus, identity: Identity, @Inject(BOSS_GRID_DEFAULT_PAGESIZE) protected defaultPagesize: number,
    @Inject(forwardRef(() => BossGridComponent)) @Host() @Optional() public grid: BossGridComponent,
    @Inject(ExtensionData) @Host() @Optional() public extensionData: ExtensionData, injector: Injector) {
    super(identity, grid, extensionData, injector);
    const pagingStatus = this.queryStatus.getPagingStatus();
    if (pagingStatus) {
      Object.keys(pagingStatus).forEach(k => this.pagingData[k] = pagingStatus[k])
    }
  }

  public naN(value) {
    return isNaN(value);
  }
  changePageSize(size: number) {
    this.pagingData.pageOptionValue = size;
    this.page = 1;
    this.reload(true);
  }
  onCreate() {
    this.pagingData = this.extensionData.getOrNew(PagingData, 'BossGridPagingFooterComponent');


  }
  onSetup() {
    if (!this.pagingData.pageOptionValue) {
      this.pagingData.pageOptionValue = this.defaultPagesize;
    }
    this.grid.dataRefresh.subscribe((response: DataSourceResponse<any>) => {
      this.length = response.totalCount;
      this.totalPage = Math.ceil(response.totalCount / this.pagingData.pageOptionValue) || 1;
      this.queryStatus.replacePagingStatus(this.pagingData);
    });
    this.grid.initState.subscribe(g => {
      this.pagingData.page = 1;
    });
    this.grid.useRefresh((ds, query) => {
      this.length = undefined;
      ds.queryOptions.skip = (this.page - 1) * this.pagingData.pageOptionValue;
      ds.queryOptions.take = this.pagingData.pageOptionValue;
      query(ds);
    });
  }
}
export class PagingData {
  pageOptionValue;
  page = 1;
}
