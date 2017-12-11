import { Key, BossApiModel } from '@boss/decorator/BossApiModel';
import { BossListField } from '@boss/decorator/list/BossListField';
import { BossListFilter } from '@boss/decorator/list/BossListFilter';
import { BossFormControl } from '@boss/decorator/form/BossFormControl';
import { Validators } from '@angular/forms';
import { BossTextareaComponent } from '@boss/bosscontrol/contorl-components/boss-textarea.component';
import { BossGridDatetimeFieldComponent } from '@boss/bosscontrol/boss-grid/boss-grid-datetime-field.component';
import { DateFormat } from '@boss/DateFormat';
import { BossList } from '@boss/decorator/list/BossList';
import { I18nNamespace } from '@boss/decorator/i18n/i18nNs';
import { BossForm, IBossFormLayout } from '@boss/decorator/form/BossForm';


export function layout(): IBossFormLayout<his> {
  return [
    [x => x.ID, x => x.Name], //排版
  ]
}

@BossApiModel('api/his')
// @I18nNamespace('')
@BossForm(layout())
// tslint:disable-next-line:class-name
export class his {
  @Key()
  public ID: number;

  @BossListField({linkToView: true})
  @BossListFilter()
  @BossFormControl({ validator: Validators.required })
  public Name: string;

  @BossListField({linkToView: true})
  @BossListFilter()
  @BossFormControl({ validator: Validators.required })
  public  Account: string;

  // @BossFormControl({ component: BossTextareaComponent })
  // public  Password: string;

  // @BossFormControl({ component: BossTextareaComponent })
  // public  Status: number;

  // @BossFormControl({ component: BossTextareaComponent })
  // public  Remark: string;

  // @BossListField({ component: BossGridDatetimeFieldComponent, componentData: { format: DateFormat.yMMddHHmmss }, order: 1 })
  // public CreatedTime: Date;

  // @BossFormControl({ component: BossTextareaComponent })
  // public  CreatedBy: number;

  // @BossListField({ component: BossGridDatetimeFieldComponent, componentData: { format: DateFormat.yMMddHHmmss }, order: 1 })
  // public  LastModifiedTime: Date;

  // public  LastModifiedBy: number;
}
