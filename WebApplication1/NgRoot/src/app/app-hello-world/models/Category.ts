import { BossApiModel, Key } from '@boss/decorator/BossApiModel';
import { BossListField } from '@boss/decorator/list/BossListField';
import { BossListFilter } from '@boss/decorator/list/BossListFilter';
import { BossFormControl } from '@boss/decorator/form/BossFormControl';
import { Validators } from '@angular/forms';
import { BossList } from '@boss/decorator/list/BossList';
import { I18nNamespace } from '@boss/decorator/i18n/i18nNs';
import { GoNewsButton } from './GoNewsButton'

@BossApiModel('api/Category')
@I18nNamespace('Model.HelloWorld.Category')
@BossList({
    actions: [GoNewsButton.provider]
})

export class Category {
  @Key()
  public Id: number;
  // Required()// StringLength(100)
  @BossListField({linkToView: true })
  @BossListFilter()
  @BossFormControl({ validator: Validators.required })
  public Name: string;

  @BossListField()
  public NewsCount: number;
}
