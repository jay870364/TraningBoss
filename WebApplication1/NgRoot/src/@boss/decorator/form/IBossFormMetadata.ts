import { FormControl } from '@angular/forms';
import { Component, Type } from '@angular/core';
import { WarpperControl } from '../../bosscontrol/services/WarpperControl';
export interface IBossFormMetadata {
  control?: FormControl,
  field?: string,
  component?: Type<any>,
  componentData?: any;
  warpperControl?: WarpperControl;
}
