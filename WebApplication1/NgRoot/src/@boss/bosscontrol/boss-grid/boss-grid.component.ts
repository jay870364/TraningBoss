import { Component, ContentChildren, QueryList, Input, OnInit, forwardRef, TemplateRef, ViewChild, ContentChild, ElementRef, AfterContentInit, Output, EventEmitter, Inject, HostBinding } from '@angular/core';
import { BossGridCellTemplateComponent } from './boss-grid-cell-template.component';
import { BossGridHeaderTemplateComponent } from './boss-grid-header-template.component';
import { IDataSource } from '../../services/datasource/IDataSource';
import { Observable } from 'rxjs/Observable';
import { DataSourceResponse } from '../../services/datasource/DataSourceResponse';
import { BossGridHeaderComponent, BossGridFooterComponent } from './boss-grid-schemas.component';
import { NgForm } from '@angular/forms';
import { BossGridFilterOperatorDirective } from './boss-grid-filter-operator.directive';
import { IFilterOperator } from '../../services/datasource/IDatasourceFilter';
import { ExtensionData } from './services/ExtensionData';
import { DataSourceFactory } from '../../services/datasource/DataSourceFactory';
import { IBossGridExtension } from './IBossGridExtension';
import { IBossGridField } from '../../decorator/list/BossListModel';
import { BOSS_GRID_FILED } from './tokens';
import { Subject, BehaviorSubject } from 'rxjs/Rx';

export class BossGridSort {
  public field: string;
  public direction: BossGridSortStatus;
}
export enum BossGridSortStatus {
  none = 0,
  asc = 1,
  desc = 2
}
export type IQueryMiddleware = (datasource: IDataSource<any>, query: (datasource: IDataSource<any>) => void, grid: BossGridComponent) => void;
export type IValueTransformer = (value: any, set: (valueToset) => void) => string;
@Component({
  selector: 'boss-grid',
  templateUrl: './boss-grid.component.html',
  styleUrls: ['./boss-grid.component.scss'],
  providers: [ExtensionData]
})
export class BossGridComponent implements AfterContentInit {
  @HostBinding('class.auto-height') classAutoHeight = false;
  @Input() public valueParsers: { [key: string]: IValueTransformer } = {};
  @ContentChildren(forwardRef(() => BOSS_GRID_FILED)) public fields: QueryList<IBossGridField>;
  @Input() public fieldComponents: IBossGridField[];
  @ContentChild(forwardRef(() => BossGridHeaderComponent)) public header: BossGridHeaderComponent;
  @ContentChild(forwardRef(() => BossGridFooterComponent)) public footer: BossGridFooterComponent;
  @Output() public dataSourceSet = new EventEmitter<IDataSource<any>>();
  @Output() public dataLoaded = new EventEmitter<DataSourceResponse<any>>();
  @Output() public sortChang = new EventEmitter<BossGridSort[]>();
  @Output() public init = new EventEmitter<BossGridComponent>();
  @Output() public initState = new EventEmitter();
  @Output() public refreshing = new EventEmitter<IDataSource<any>>();
  public viewReady = new BehaviorSubject<boolean>(false);
  protected _dataRefresh = new Subject<DataSourceResponse<any>>();
  public dataRefresh = this._dataRefresh.asObservable();
  @Input() public sorting: boolean;
  @Input() set filter(form: IBossGridExtension) {
    this.addExtension(form);
  }
  public get finalFields() {
    return this.fields.map(x => x).concat(this.fieldComponents).filter(x => x);
  }
  protected _scrolling = true;
  @Input() public set scrolling(value: boolean) {
    this.classAutoHeight = !value;
    this._scrolling = value;
  }
  public get scrolling() {
    return this._scrolling;
  }
  @Input() public autoLoad = true;
  @Input() public showHeader = true;
  @Input() public raised = true;
  @Input() set datasource(value: IDataSource<any>) {
    if (value) {
      if (!value['toSubject']) {
        value = this.datasourceFactory.getDataSource(value as any);
      }
      this._datasource = value;
      this.dataSourceSet.emit(value);
      if (this.autoLoad) {
        this.load();
      }
    } else {
      this._datasource = undefined;
    }
  }
  get datasource(): IDataSource<any> {
    return this._datasource;
  }
  protected querySource: IDataSource<any>;
  public subject$: Observable<DataSourceResponse<any>>;
  public data: any[];
  protected _datasource: IDataSource<any>;
  public sortStatusEnum = [BossGridSortStatus.none, BossGridSortStatus.asc, BossGridSortStatus.desc]
  public _sortStatus: BossGridSort[] = [];
  public sortStatusMap = {};
  protected _load = false;
  @Input() public set sortStatus(value: BossGridSort[]) {
    value = value || [];
    this._sortStatus = value;
    this.sortChang.emit(value);
    const map = {};
    value.forEach((e, i) => {
      map[e.field] = { dir: e.direction, idx: i + 1 };
    });
    this.sortStatusMap = map;
    this.load();
  }
  public get sortStatus() {
    return this._sortStatus;
  }

  public loading = false;
  public hasData = false;
  public inited = false;
  protected _refreshing = false;
  /**
   * use "useQuery" , if use this array directly, need call buildQuery to rebuild query
   *
   * @type {IQueryMiddleware[]}
   * @memberof BossGridComponent
   */
  public queryMiddlewares: IQueryMiddleware[] = [];
  public refreshMiddlewares: IQueryMiddleware[] = [];
  public extensions: IBossGridExtension[] = [];
  protected needRebuildQuery = true;
  protected needRebuildRefresh = true;
  protected valueAccessorCache: { [field: string]: Function } = {};
  public query: IQueryMiddleware;
  public refreshQuery: IQueryMiddleware;
  public useQuery(action: IQueryMiddleware): void {
    this.queryMiddlewares.push(action);
    this.needRebuildQuery = true;
  }
  public useRefresh(action: IQueryMiddleware): void {
    this.refreshMiddlewares.push(action);
    this.needRebuildRefresh = true;
  }
  public addExtension(extension: IBossGridExtension) {
    if (extension.grid !== this) {
      extension.grid = this;
    }
    if (extension.extensionData !== this.extensionData) {
      extension.extensionData = this.extensionData;
    }
    this.extensions.push(extension);
  }
  constructor( @Inject(ExtensionData) public extensionData: ExtensionData, @Inject(DataSourceFactory) protected datasourceFactory: DataSourceFactory) {

  }
  public headerClick(field: IBossGridField, event: MouseEvent) {
    if (this.sorting !== false && field.sort) {
      const key = field.field;
      if (key) {
        const map: { [key: string]: BossGridSort } = {};
        if (!(event.ctrlKey || event.shiftKey)) {
          const sort = this.sortStatus.filter(v => v.field === key);
          if (sort.length > 0) {
            map[sort[0].field] = sort[0];
          }
        } else {
          this.sortStatus.forEach(element => {
            map[element.field] = element;
          });
        }


        if (!map[key]) {
          map[key] = { field: key, direction: BossGridSortStatus.asc };
        } else {
          map[key].direction++;
        }
        if (map[key].direction >= this.sortStatusEnum.length) {
          map[key].direction = BossGridSortStatus.none;
        }
        if (map[key].direction === BossGridSortStatus.none) {
          delete map[key];
        }
        this.sortStatus = Object.keys(map).map(x => map[x]);
      }
    }
  }
  protected createValueAccessor(field: string) {
    const pathes = field.split('.');
    return (entry) => {
      let value = entry;
      pathes.every(path => {
        if (value !== undefined && value !== null) {
          value = value[path];
          return true;
        } else {
          return false;
        }
      });
      return value;
    };
  }
  public getValue(field: string, entry: any) {
    if (field === undefined || field === null) {
      return undefined;
    }
    if (!this.valueAccessorCache[field]) {
      this.valueAccessorCache[field] = this.createValueAccessor(field);
    }
    return this.valueAccessorCache[field](entry);
  }
  ngAfterContentInit(): void {
    this.init.emit(this);
    this.inited = true;
    this.viewReady.next(true);
    if (this.autoLoad) {
      this.load(false);
    }
  }

  public refresh() {
    if (this._refreshing) {
      return;
    }
    this._refreshing = true;
    if (this.inited && this.querySource) {
      this.extensions.filter(x => !x.ready).forEach(x => x.setup());
      this.buildRefresh();

      this.refreshQuery(this.querySource, (ds) => {
        this.loading = true;
        this.refreshing.emit(ds);
        this.hasData = false;
        this.subject$ = ds.toSubject();
        const httpSub$ = this.subject$.subscribe(hds => {
          this.hasData = !!hds.totalCount || hds.data.length > 0;
          this.dataLoaded.emit(hds);
          this._dataRefresh.next(hds);
          this.data = hds.data || [];
        }, null, () => {
          this.loading = false;
          this._refreshing = false;

          if (httpSub$) {
            httpSub$.unsubscribe();
          }
        });
      }, this);

    }
  }

  public buildQuery(): void {
    if (this.needRebuildQuery) {
      const middleware = this.queryMiddlewares.slice(0).reverse();
      middleware.unshift((datasource, query) => {
        for (const sort of this.sortStatus) {
          if (sort.direction !== BossGridSortStatus.none) {
            datasource = datasource.orderby(sort.field.replace(/\./g, '/'), <any>BossGridSortStatus[sort.direction]);
          }
        }
        query(datasource);
      })
      this.query = middleware
        .reduce((nextDelegate: IQueryMiddleware, currentDelegate) => (datasource, next, grid) => currentDelegate(datasource, resultDatasource => nextDelegate(resultDatasource, next, grid), grid));
      this.needRebuildQuery = false;
    }
  }
  public buildRefresh(): void {
    if (this.needRebuildRefresh) {
      this.refreshQuery = this.refreshMiddlewares.slice(0).reverse()
        .reduce((nextDelegate: IQueryMiddleware, currentDelegate) => (datasource, next, grid) => currentDelegate(datasource, resultDatasource => nextDelegate(resultDatasource, next, grid), grid)
        , (ds, query) => query(ds));
      this.needRebuildRefresh = false;
    }
  }
  public load(initState?: boolean) {

    if (this.inited && this._datasource) {
      if (this._load) {
        return;
      }
      this._load = true;
      if (initState) {
        this.initState.emit();
      }
      this.extensions.filter(x => !x.ready).forEach(x => x.setup());
      this.buildQuery();
      this.loading = true;
      try {
        this.query(this._datasource.clone(), datasource => {
          this.querySource = datasource;
          this.refresh();
          this._load = false;
        }, this);
      } catch (ex) {
        this._load = false;
        console.error(ex);
      }
    }
  }
}




