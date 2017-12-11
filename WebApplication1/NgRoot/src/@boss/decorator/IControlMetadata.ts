import { PlatformProvider } from './../PlatformProvider';
import { Type } from '@angular/core';
import { ValueOrArray } from '../ValueOrArray';
import { WarpperControl } from '@boss/bosscontrol/services/WarpperControl';
import { IWarpperControl } from '@boss/bosscontrol/services/IWarpperControl';
export interface IControlMetadata {
  field: string;
  component: Type<any>;
  componentData: Object | Function;
  warpperControl: PlatformProvider<IWarpperControl>;
}
