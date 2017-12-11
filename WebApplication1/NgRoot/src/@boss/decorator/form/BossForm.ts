import { PlatformProvider } from './../../PlatformProvider';

import { IBossFormModel } from './BossFormModel';
import { ValueOrArray } from '../../ValueOrArray';
import { ValueOrArrayResolver } from '../../ValueOrArrayResolver';
import { BossFormRowLayout, IBossFormLayoutBuilder } from './BossFormLayout';
import { IBossActionButton } from '../IBossActionButton';
import { BossFormLoad, BossFormSubmit, BossFormLoadHandler } from '../../bosscontrol/services/form/BossFormBase';



export type IBossFormLayoutRow<T> = PropertyExpression<T>[] | IBossFormLayoutBuilder<any>;
export type IBossFormLayout<T> = IBossFormLayoutRow<T>[];
export interface IBossFormOptions<T> {
  load?: ValueOrArray<BossFormLoad<T>>;
  loadHandler?: ValueOrArray<PlatformProvider<BossFormLoadHandler<T>>>;
  submit?: ValueOrArray<BossFormSubmit<T>>;
  actions?: PlatformProvider<IBossActionButton<T>>[];
}
export function BossForm<T>(layout: IBossFormLayout<T>, options: IBossFormOptions<T> = {}) {
  if (!options.load) {
    options.load = [];
  }
  if (!options.submit) {
    options.submit = [];
  }
  return (target) => {
    const tar = (<IBossFormModel<T>>target);
    tar.bossFormLayout = layout.map(x => Array.isArray(x) ? new BossFormRowLayout(x) : x);
    tar.bossFormLoad = new ValueOrArrayResolver(options.load).array;
    tar.bossFormLoadHandler = new ValueOrArrayResolver(options.loadHandler).array;
    tar.bossFormSubmit = new ValueOrArrayResolver(options.submit).array;
    tar.bossFormActions = options.actions || [];
  }
}
