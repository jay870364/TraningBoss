import { PlatformProvider } from './../../PlatformProvider';
import { Component, Type, TemplateRef } from '@angular/core';
import { IFilterOperator } from '../../services/datasource/IDatasourceFilter';
import { IBossListSettings } from '../../bosscontrol/services/list/BossAutoList';
import { BossGridFieldComponent } from '../../bosscontrol/boss-grid/boss-grid-field.component';
import { IBossActionButton } from '../IBossActionButton';
import { IControlMetadata } from '../IControlMetadata';
import { Observable } from 'rxjs/Observable';
import { IDataSource } from '@boss/services/datasource/IDataSource';
import { BossGridComponent } from '../../bosscontrol/boss-grid/boss-grid.component';
import { IBossGridAutoFormQueryMiddleware, IBossGridAutoFormQueryHandler } from '@boss/bosscontrol/boss-grid/boss-grid-auto-filter.component';
export interface IBossGridField {
  fieldStatus: Observable<{ [key: string]: any }>;
  field?: string;
  header?: string;
  ngStyle?: any;
  widthStyles?: any;
  finalHeaderTemplate: TemplateRef<any>;
  finalCellTemplate: TemplateRef<any>;

  getCellStyles: (value: any, entry: any) => any;
  getCellClasses: (value: any, entry: any) => any;
  headerStyles: any;
  width?: string;
  align?: string;
  verticalAlign?: string;
  visible?: boolean;
  sort?: boolean;
  setFieldStatus(key: string, value: any): void;
}
export interface IBossListMetadata extends IControlMetadata {
  componentData: IBossGridField;
  field: string;
  header: string;
  order: number;
  component: Type<BossGridFieldComponent>
}

export interface IBossListFilterMetadata extends IControlMetadata {
  header: string;
  order?: number;
  operator?: IFilterOperator;
  filterEmpty?: boolean;
  query?: IBossGridAutoFormQueryMiddleware;
  queryHandler?: PlatformProvider<IBossGridAutoFormQueryHandler<any>>
}
export interface IBossListModel<T> {
  bossListMetadata?: IKeyValuePair<IBossListMetadata>;
  bossListSettings?: IBossListSettings<T>;
  bossListFilterMetadata?: IKeyValuePair<IBossListFilterMetadata>;
  bossListActions?: PlatformProvider<IBossActionButton<T>>[];
  bossListSelect?: string[];
}
