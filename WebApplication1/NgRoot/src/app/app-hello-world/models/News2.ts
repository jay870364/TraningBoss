import {BossListFilter} from '../../../@boss/decorator/list/BossListFilter';
import { BossApiModel, Key } from '@boss/decorator/BossApiModel';
import { I18nNamespace } from '@boss/decorator/i18n/i18nNs';
import { Category } from './Category';
import { BossListField } from '@boss/decorator/list/BossListField';
import { BossFormControl } from '@boss/decorator/form/BossFormControl';
import { Validators } from '@angular/forms';
import { BossTextareaComponent } from '@boss/bosscontrol/contorl-components/boss-textarea.component';
import { BossFileUploadComponent } from '@boss/bosscontrol/contorl-components/boss-file-upload.component';
import { BossGridDatetimeFieldComponent } from '@boss/bosscontrol/boss-grid/boss-grid-datetime-field.component';
import { DateFormat } from '@boss/DateFormat';
import { IBossFormLayout, BossForm } from '@boss/decorator/form/BossForm';
import { BossFormRowLayout } from '@boss/decorator/form/BossFormLayout';
import { BossReferenceComponent } from '@boss/bosscontrol/contorl-components/boss-reference.component';
import { BossFilterForm } from '@boss/bosscontrol/services/form/BossFilterForm';
export function layout(): IBossFormLayout<News2> {
  return [
    [x => x.Title, x => x.CategoryId], //排版
    [x => x.Images],
    [x => x.Content]
  ]
}


@BossApiModel('api/News2')
// @I18nNamespace('Model.HelloWorld.News')
@BossForm(layout())
export class News2 {

  @Key()
  public Id: number;
  // Required()// StringLength(100)
  @BossListField({ linkToView: true })
  @BossListFilter()
  @BossFormControl({ validator: Validators.required })
  public Title: string;
  // MaxLength()

  @BossFormControl({ component: BossTextareaComponent })
  public Content: string;

  @BossFormControl({
    component: BossFileUploadComponent,
    componentData: {
      layout: 'both',
      extLimit: ['jpg', 'gif', 'png'],
      cropperSize: { width: 300, height: 200 },
      fileCOuntLimit: 100
    }
  })
  public Images: string;

  @BossListField({ component: BossGridDatetimeFieldComponent, componentData: { format: DateFormat.yMMddHHmmss }, order: 1 })
  public CreatedTime: Date;

  public CreatedBy: number;

  @BossListField({ component: BossGridDatetimeFieldComponent, componentData: { format: DateFormat.yMMddHHmmss }, order: 2 })
  public LastModifiedTime: Date;

  public LastModifiedBy: number;

  @BossListFilter()
  @BossFormControl({ component: BossReferenceComponent, componentData: { modelType: Category, field: 'Name', validator: Validators.required } })
  public CategoryId: number;

  @BossListField({
    field: 'Category.Name'
  })
  public Category: Category;
}
