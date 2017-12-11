import { BossGridComponent } from './boss-grid.component';

import { Component, forwardRef, Input, ViewChild, Inject, Host, Optional, ContentChild, AfterContentInit, AfterViewInit, ContentChildren, QueryList, OnInit, Injector } from '@angular/core';
import { BossGridExtensionComponent } from './boss-grid-extension.component';
import { NgForm, FormGroup, NgModel } from '@angular/forms';
import { BossGridFilterOperatorDirective } from './boss-grid-filter-operator.directive';
import { IFilterOperator } from '@boss/services/datasource/IDatasourceFilter';
import { ExtensionData } from './services/ExtensionData';
import { BossGridCustomFilterDirective } from './boss-grid-custom-filter.directive';
import { ActivatedRoute } from '@angular/router';
import { BossAutoForm } from '../services/form/BossAutoForm';
import { BossFilterForm } from '../services/form/BossFilterForm';
import { IBossListFilterMetadata } from '../../decorator/list/BossListModel';
import { FormGroupHelper } from '../services/FormGroupHelper';
import { Identity } from '../../services/Identity';
import { IDataSource } from '@boss/services/datasource/IDataSource';
import { OdataFilter } from '../../services/datasource/odata/OdataFilter';
import { OdataDataSource } from '../../services/datasource/odata/OdataDatasource';
import { RawFilter } from '@boss/bosscontrol/services/RawFilter';
import { BossQueryStatus } from '@boss/bosscontrol/services/BossQueryStatus';
export type IBossGridAutoFormQueryMiddleware = (ds: IDataSource<any>, query: (ds: IDataSource<any>) => void, grid: BossGridComponent, value: any) => void;
export interface IBossGridAutoFormQueryHandler<T> {
  query: IBossGridAutoFormQueryMiddleware;
}
@Component({
  selector: 'boss-grid-auto-filter',
  templateUrl: './boss-grid-auto-filter.component.html',
  styleUrls: ['./boss-grid-auto-filter.component.scss']
})
export class BossGridAutoFilterComponent extends BossGridExtensionComponent implements AfterViewInit {
  protected defaultFilterValues = {};
  protected psetup = false;
  constructor(
    protected queryStauts: BossQueryStatus,
    identity: Identity,
    @Inject(forwardRef(() => BossGridComponent))
    @Host()
    @Optional()
    public grid: BossGridComponent,
    @Inject(ExtensionData)
    @Host()
    @Optional()
    public extensionData: ExtensionData,
    public form: BossFilterForm<any>,
    public route: ActivatedRoute,
    protected formGroupHelper: FormGroupHelper,
    injector: Injector
  ) {
    super(identity, grid, extensionData, injector);
  }
  ngAfterViewInit() {

  }
  submitForm() {
    this.grid.load(true);
  }
  public reset() {
    this.form.formGroup.reset(this.defaultFilterValues);
    setTimeout(() => this.grid.load(true));
  }

  onSetup() {
    this.route.queryParams.subscribe(queryParams => {
      if (this.form) {
        this.defaultFilterValues = this.formGroupHelper.extractModelFromQueryParams(this.form.formGroup, queryParams);
        this.formGroupHelper.setValueStateFromQueryParams(this.form.formGroup, queryParams);
      }
      this.form.formGroup.reset(Object.assign(this.queryStauts.getStatus(), this.defaultFilterValues));
      this.grid.dataRefresh.subscribe(() => {
        this.queryStauts.replaceStatus(this.form.formGroup.value);
      })
      this.grid.load(true);
    });
    const injector = Injector.create([{ provide: BossGridAutoFilterComponent, useValue: this }], this.injector);
    this.form.filters.forEach(filterSetting => {
      if (filterSetting.filter.queryHandler) {
        const handler = filterSetting.filter.queryHandler.get(injector) as IBossGridAutoFormQueryHandler<any>;
        this.grid.useQuery((ds, query, grid) => handler.query(ds, query, grid, filterSetting.formControl.control.value));
      } else if (filterSetting.filter.query) {
        this.grid.useQuery((ds, query, grid) => filterSetting.filter.query(ds, query, grid, filterSetting.formControl.control.value));
      } else {
        this.grid.useQuery((ds, query) => {
          const value = filterSetting.formControl.control.value;
          if (value instanceof RawFilter) {
            ds = ds.where(value.filterString);
          } else
            if (value !== undefined && value !== null) {
              ds = ds.where(filterSetting.filter.field, filterSetting.filter.operator, filterSetting.formControl.control.value);
            }
          query(ds);
        });
      }
    });


  }
}

