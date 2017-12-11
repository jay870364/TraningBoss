import { BossApiModel, Key } from '@boss/decorator/BossApiModel';
import { DataStatus } from '@enums/DataStatus';
import { BossListField } from '@boss/decorator/list/BossListField';
import { BossFormControl } from '@boss/decorator/form/BossFormControl';
import { BossTextboxComponent } from '@boss/bosscontrol/contorl-components/boss-textbox.component';
import { Validators } from '@angular/forms';
import { BossSwitchComponent } from '@boss/bosscontrol/contorl-components/boss-switch.component';
import { I18nNamespace } from '@boss/decorator/i18n/i18nNs';
import { BossGridEnumFieldComponent } from '@boss/bosscontrol/boss-grid/boss-grid-enum-field.component';
import { BossForm } from '@boss/decorator/form/BossForm';
import { Menu } from './Menu';
import { BossReferenceComponent } from '@boss/bosscontrol/contorl-components/boss-reference.component';
import { PredefinedComponentData } from '../../PredefinedComponentData';

export function layout(): PropertyExpression<PlatformSystem>[][] {
  return [
    [x => x.Code, x => x.Name, x => x.DefaultMenuId],
    [x => x.Status],
    [x => x.Remark]
  ]
}

@BossApiModel('api/PlatformSystem')
@I18nNamespace('Model.Platform.PlatformSystem')
@BossForm(layout())
export class PlatformSystem {
  @Key()　 Id: number;
  @BossListField() Code: string;

  @BossListField({ linkToView: true }) Name: string;

  @BossListField({ componentData: PredefinedComponentData.statusEnum, component: BossGridEnumFieldComponent })
  @BossFormControl({ component: BossSwitchComponent })
  Status: DataStatus = 0;

  @BossListField() Remark: string;


  @BossFormControl({ component: BossReferenceComponent, componentData: { modelType: Menu, field: 'Name' } }) DefaultMenuId: number;

  DefaultMenu: Menu;
  CreatedTime?: Date;

  CreatedBy: string;

  ModifiedTime?: Date;

  LastModifiedBy: string;
}
