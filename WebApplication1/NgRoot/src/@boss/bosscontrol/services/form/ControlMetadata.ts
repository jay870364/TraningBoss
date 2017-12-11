import { IBossFormModelSetting } from '../../../decorator/form/BossFormModel';
import { IBossFormMetadata } from '../../../decorator/form/IBossFormMetadata';
import { Injectable, Injector } from '@angular/core';
import { BossEditForm } from './BossEditForm';
import { BossAutoForm } from './BossAutoForm';
import { BossFormBase } from './BossFormBase';
import { ValueOrArrayResolver } from '../../../ValueOrArrayResolver';
import { FormControl, ValidatorFn, AsyncValidatorFn, Validator, AsyncValidator, AbstractControl } from '@angular/forms';
import { IBossListFilterMetadata } from '../../../decorator/list/BossListModel';
import { IControlMetadata } from '../../../decorator/IControlMetadata';

@Injectable()
export class ControlMetadata {

  public createMetaData(setting: IControlMetadata, formInjector: Injector, control?: FormControl) {
    const meta: IBossFormMetadata = {
      control: control || new FormControl(),
      field: setting.field,
      component: setting.component
    };
    if (setting.warpperControl) {
      const injector = Injector.create([{ provide: FormControl, useValue: meta.control }, { provide: AbstractControl, useExisting: FormControl }], formInjector);
      meta.warpperControl = setting.warpperControl.get(injector);
    }
    if (setting.componentData) {
      if (typeof setting.componentData === 'object') {
        meta.componentData = Object.assign({}, setting.componentData);
      } else {
        meta.componentData = setting.componentData();
      }
    }
    return meta;
  }
  public createControl(setting: IBossFormModelSetting, injector: Injector) {
    let validators: ValidatorFn[] = [];
    if (setting.validator) {
      if (typeof setting.validator === 'function') {
        validators.push(setting.validator);
      } else {
        validators = validators.concat(setting.validator);
      }
    }
    let asyncValidators: AsyncValidatorFn[] = [];
    if (setting.asyncValidator) {
      if (typeof setting.asyncValidator === 'function') {
        asyncValidators.push(setting.asyncValidator);
      } else {
        asyncValidators = asyncValidators.concat(setting.asyncValidator);
      }
    }
    if (setting.validatorType) {
      const vts = new ValueOrArrayResolver(setting.validatorType).array;
      if (vts.length) {
        const validatorInjector = Injector.create(vts.map(x => x.provider), injector);
        validators = validators.concat(vts.map(x => x.get(validatorInjector)).map(x => (c: AbstractControl) => x.validate(c)));
      }
    }
    if (setting.asyncValidatorType) {
      const vts = new ValueOrArrayResolver(setting.asyncValidatorType).array;
      if (vts.length) {
        const validatorInjector = Injector.create(vts.map(x => x.provider), injector);
        asyncValidators = asyncValidators.concat(vts.map(x => x.get(validatorInjector)).map(x => (c: AbstractControl) => x.validate(c)));
      }
    }
    return new FormControl(undefined, validators, asyncValidators);
  }
  public createMetadataFromSetting(setting: IBossFormModelSetting, formInjector: Injector) {


    return this.createMetaData(setting, formInjector, this.createControl(setting, formInjector));
  }
}
