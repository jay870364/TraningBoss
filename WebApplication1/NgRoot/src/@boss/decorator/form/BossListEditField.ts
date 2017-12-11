import { IBossFormControlOptions } from './BossFormControl';
import { IBossFormModel } from './BossFormModel';
import { BossTextboxComponent } from '../../bosscontrol/contorl-components/boss-textbox.component';
import { Select } from '../BossApiModel';
export function buildMetaData(propertyKey: string, options: IBossFormControlOptions = {}) {
  return {
    validator: options.validator,
    asyncValidator: options.asyncValidator,
    validatorType: options.validatorType,
    asyncValidatorType: options.asyncValidatorType,
    field: propertyKey,
    component: options.component,
    componentData: options.componentData || {},
    warpperControl: options.warpperControl
  };
}
export function BossListEditField(options: IBossFormControlOptions = {}) {
  return function (target: Object, propertyKey: string) {
    Select()(target, propertyKey);
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
