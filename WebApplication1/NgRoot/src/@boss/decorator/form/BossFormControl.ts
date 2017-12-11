import { PlatformProvider } from './../../PlatformProvider';
import { FormGroup, FormControl, AbstractControl, ValidatorFn, AsyncValidatorFn, Validators, Validator, AsyncValidator } from '@angular/forms';
import { IBossFormModel } from './BossFormModel';
import { BossTextboxComponent } from '../../bosscontrol/contorl-components/boss-textbox.component';
import { Component, Type, Provider } from '@angular/core';
import { ValueOrArray } from '../../ValueOrArray';
import { IWarpperControl } from '../../bosscontrol/services/IWarpperControl';

export interface IBossFormControlOptions {
  component?: Type<any>;
  componentData?: any | Function;
  validatorType?: ValueOrArray<PlatformProvider<Validator>>,
  asyncValidatorType?: ValueOrArray<PlatformProvider<AsyncValidator>>,
  validator?: ValidatorFn | ValidatorFn[] | null;
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;
  warpperControl?: PlatformProvider<IWarpperControl>
}
export function buildMetaData(propertyKey: string, options: IBossFormControlOptions = {}) {
  return {
    validator: options.validator,
    asyncValidator: options.asyncValidator,
    validatorType: options.validatorType,
    asyncValidatorType: options.asyncValidatorType,
    field: propertyKey,
    component: options.component || BossTextboxComponent,
    componentData: options.componentData || {},
    warpperControl: options.warpperControl
  };
}
export function BossFormControl(options: IBossFormControlOptions = {}) {
  return function (target: Object, propertyKey: string) {
    const obj = target.constructor as any as IBossFormModel<any>;
    if (!obj.bossFormModelSetting) {
      obj.bossFormModelSetting = {};
    }
    const fg = obj.bossFormModelSetting;
    if (!(propertyKey in fg)) {
      fg[propertyKey] = buildMetaData(propertyKey, options);
    }
  }
}
