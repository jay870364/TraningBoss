import { I18nNamespace } from '@boss/decorator/i18n/i18nNs';
import { BossApiModel, Key } from '@boss/decorator/BossApiModel';
import { BossList } from '@boss/decorator/list/BossList';
import { PlatformSystem } from './PlatformSystem';
import { BossListField } from '@boss/decorator/list/BossListField';
import { Account } from './Account';
import { BossListFilter } from '@boss/decorator/list/BossListFilter';
import { BossReferenceComponent } from '@boss/bosscontrol/contorl-components/boss-reference.component';
import { SystemRef } from './SystemRef';
import { AccountRef } from './AccountRef';


@I18nNamespace('Model.Platform.AccountSystemRef')
@BossApiModel('api/AccountSystem')
export class AccountSystemRef {

  @Key()// DatabaseGenerated(PlatformSystem.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)
  public Id: number;

  public Owner: Account;
  @BossListField({ field: 'Name' })
  @BossListFilter()
  public Name: string;
  public System: PlatformSystem;

  @BossListField({ field: 'Owner.Name' })
  @BossListFilter({
    component: BossReferenceComponent,
    componentData: {
      modelType: AccountRef,
      field: 'Name'
    },
    operator: '='
  })
  public OwnerId: number;
  @BossListField({ field: 'System.Name' })
  @BossListFilter({
    component: BossReferenceComponent,
    componentData: {
      modelType: SystemRef,
      field: 'Name'
    },
    operator: '='
  })
  public SystemId: number;
}
