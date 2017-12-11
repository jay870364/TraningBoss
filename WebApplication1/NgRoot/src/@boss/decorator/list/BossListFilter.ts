import { PlatformProvider } from './../../PlatformProvider';
import { Component, Type } from '@angular/core';
import { IBossListModel } from './BossListModel';
import { IFilterOperator } from '../../services/datasource/IDatasourceFilter';
import { BossTextboxComponent } from '../../bosscontrol/contorl-components/boss-textbox.component';
import { Property } from '../Property';
import { WarpperControl } from '../../bosscontrol/services/WarpperControl';
import { IWarpperControl } from '../../bosscontrol/services/IWarpperControl';
import { IBossGridAutoFormQueryMiddleware, IBossGridAutoFormQueryHandler } from '@boss/bosscontrol/boss-grid/boss-grid-auto-filter.component';
export interface IBossListFilterOptions {
  title?: string;
  operator?: IFilterOperator;
  query?: IBossGridAutoFormQueryMiddleware;
  queryHandler?: PlatformProvider<IBossGridAutoFormQueryHandler<any>>
  order?: number;
  component?: Type<any>;
  componentData?: Object | Function;
  field?: string;
  warpperControl?: PlatformProvider<IWarpperControl>
}
export function getDefaultOperator(type: string) {
  switch (type) {
    case 'Number':
      return '=';
    default:
      return 'contains'
  }
}
export function BossListFilter(options: IBossListFilterOptions = {}) {
  return function (target: Object, propertyKey: string) {
    Property(options.field)(target, propertyKey);
    const obj = target.constructor as any as IBossListModel<any>;
    if (!obj.bossListFilterMetadata) {
      obj.bossListFilterMetadata = {};
    }
    const field = options.field || propertyKey;
    const fg = obj.bossListFilterMetadata;
    if (!fg.hasOwnProperty(field)) {
      fg[field] = {
        field: field,
        component: options.component || BossTextboxComponent,
        operator: options.operator || getDefaultOperator(Reflect.getMetadata('design:type', target, propertyKey).name),
        query: options.query,
        order: options.order,
        queryHandler: options.queryHandler,
        header: options.title || propertyKey,
        componentData: options.componentData,
        warpperControl: options.warpperControl
      };
    }
  }
}
