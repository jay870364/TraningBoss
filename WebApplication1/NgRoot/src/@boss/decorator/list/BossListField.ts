import { PlatformProvider } from './../../PlatformProvider';
import { IBossListMetadata, IBossListModel } from './BossListModel';
import { Component, Type } from '@angular/core';
import { BossGridFieldComponent } from '../../bosscontrol/boss-grid/boss-grid-field.component';
import { WarpperControl } from '../../bosscontrol/services/WarpperControl';
import { IWarpperControl } from '../../bosscontrol/services/IWarpperControl';
import { Property } from '@boss/decorator/Property';
export interface IBossListFieldOptions {
  componentData?: any;
  component?: Type<BossGridFieldComponent>;
  order?: number;
  field?: string;
  header?: string;
  displayFormatter?: (entry, property) => string;
  linkToView?: boolean;
  warpperControl?: PlatformProvider<IWarpperControl>
}
export function ProcessListFieldOptions(options: IBossListFieldOptions) {
  if (!options.componentData) {
    options.componentData = {};
  }
  if (options.linkToView) {
    options.componentData.linkToView = options.linkToView;
  }
  if (options.displayFormatter) {
    options.componentData.displayFormatter = options.displayFormatter;
  }
}
export function BossListField(options: IBossListFieldOptions = {}) {
  return function (target: Object, propertyKey: string) {
    Property()(target, propertyKey);
    const obj = target.constructor as any as IBossListModel<any>;
    ProcessListFieldOptions(options);
    if (!obj.bossListMetadata) {
      obj.bossListMetadata = {};
    }
    const fg = obj.bossListMetadata;
    const field = options.field || propertyKey;
    if (!fg.hasOwnProperty(field)) {
      fg[field] = {
        componentData: options.componentData,
        field: field,
        order: options.order,
        component: options.component,
        header: options.header || field,
        warpperControl: options.warpperControl
      };
    }
  }
}
