

import { BossApiModel, Key, Select } from '@boss/decorator/BossApiModel';
import { DataStatus } from '@enums/DataStatus';
import { PlatformSystem } from './PlatformSystem';
import { I18nNamespace } from '@boss/decorator/i18n/i18nNs';
import { BossFormControl } from '@boss/decorator/form/BossFormControl';
import { BossListField } from '@boss/decorator/list/BossListField';
import { BossSwitchComponent } from '@boss/bosscontrol/contorl-components/boss-switch.component';
import { BossGridEnumFieldComponent } from '@boss/bosscontrol/boss-grid/boss-grid-enum-field.component';
import { Validators } from '@angular/forms';
import { BossReferenceComponent } from '@boss/bosscontrol/contorl-components/boss-reference.component';
import { SystemRef } from './SystemRef';
import { AccountRef } from './AccountRef';
import { BossListFilter } from '@boss/decorator/list/BossListFilter';
import { Property } from '@boss/decorator/Property';
import { BossList } from '@boss/decorator/list/BossList';
import { BossForm, IBossFormLayout } from '@boss/decorator/form/BossForm';
import { PredefinedComponentData } from '../../PredefinedComponentData';
import { AccountSystem } from './AccountSystem';
import { AccountSystemRef } from './AccountSystemRef';


export function layout(): IBossFormLayout<SystemDomainBinding> {
  return [
    [x => x.AccountSystemId],
    [x => x.Domain],
    [x => x.Status]
  ];
}
@BossApiModel('api/SystemDomainBinding')
@I18nNamespace('Model.Platform.SystemDomainBinding')
@BossForm(layout())
export class SystemDomainBinding {

  @Key()
  public Id: number;
  // Required()// StringLength(300)
  @BossListField({ linkToView: true })
  @BossFormControl({
    validator: [Validators.maxLength(300), Validators.required]
  })
  @BossListFilter()
  public Domain: string;
  @BossListField({ componentData: PredefinedComponentData.statusEnum, component: BossGridEnumFieldComponent })
  @BossFormControl({ component: BossSwitchComponent })
  public Status: DataStatus = 0;

  public CreatedTime: Date;

  public CreatedBy: number;

  public ModifiedTime: Date;

  public LastModifiedBy: number;
  @BossFormControl({
    validator: Validators.required,
    component: BossReferenceComponent,
    componentData: {
      modelType: AccountSystemRef,
      field: 'Name'
    }
  })
  @BossListFilter({
    component: BossReferenceComponent,
    componentData: {
      modelType: AccountSystemRef,
      field: 'Name'
    },
    operator: '='
  })
  public AccountSystemId: number;
  @BossListField({
    field: 'AccountSystem.Name'
  })
  @BossListFilter({ field: 'OwnerId', component: BossReferenceComponent, componentData: { modelType: AccountRef, field: 'Name' }, operator: '=' })
  @BossListFilter({ field: 'SystemId', component: BossReferenceComponent, componentData: { modelType: SystemRef, field: 'Name' }, operator: '=' })
  @BossListField({ field: 'AccountSystem.System.Name' })
  @BossListField({ field: 'AccountSystem.Owner.Name' })
  public AccountSystem: AccountSystem;
}
