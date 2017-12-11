import { PlatformProvider } from './../../PlatformProvider';
import { AbstractControl, ValidatorFn, AsyncValidatorFn, FormControl, Validator, AsyncValidator } from '@angular/forms';
import { Component, Type, Provider } from '@angular/core';
import { IFormSubmitContext, IFormLoadContext, BossEditForm } from '../../bosscontrol/services/form/BossEditForm';
import { BossFormRowLayout, IBossFormLayoutBuilder } from './BossFormLayout';
import { IBossFormLayout } from './BossForm';
import { IBossActionButton } from '../IBossActionButton';
import { ValueOrArray } from '../../ValueOrArray';
import { BossFormLoad, BossFormSubmit, BossFormLoadHandler } from '../../bosscontrol/services/form/BossFormBase';
import { IControlMetadata } from '../IControlMetadata';

export interface IBossFormModelSetting extends IControlMetadata {
  validator?: ValidatorFn | ValidatorFn[] | null,
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  validatorType?: ValueOrArray<PlatformProvider<Validator>>,
  asyncValidatorType?: ValueOrArray<PlatformProvider<AsyncValidator>>,
  valueTransfromer?: (model: any) => any;
}


export class IBossFormModel<T> {
  bossFormModelSetting: IKeyValuePair<IBossFormModelSetting>;
  bossFormLayout: IBossFormLayoutBuilder<any>[];
  bossFormLoad: BossFormLoad<T>[];
  bossFormLoadHandler: PlatformProvider<BossFormLoadHandler<T>>[];
  bossFormSubmit: BossFormSubmit<T>[];
  bossFormActions: PlatformProvider<IBossActionButton<T>>[];
}

