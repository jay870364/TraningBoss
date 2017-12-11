import { I18nNamespace } from '@boss/decorator/i18n/i18nNs';
import { Key, Select, BossApiModel } from '@boss/decorator/BossApiModel';
import { DataStatus } from '@enums/DataStatus';
import { PlatformSystem } from './PlatformSystem';
import { BossListField } from '@boss/decorator/list/BossListField';
import { BossForm, IBossFormLayout } from '@boss/decorator/form/BossForm';
import { BossFormControl } from '@boss/decorator/form/BossFormControl';
import { BossReferenceComponent } from '@boss/bosscontrol/contorl-components/boss-reference.component';
import { Account } from './Account';
import { AccountRef } from './AccountRef';
import { SystemRef } from './SystemRef';
import { Validators } from '@angular/forms';
import { BossGridEnumFieldComponent } from '@boss/bosscontrol/boss-grid/boss-grid-enum-field.component';
import { BossDatepickerComponent } from '@boss/bosscontrol/contorl-components/boss-datepicker.component';
import { BossGridDatetimeFieldComponent } from '@boss/bosscontrol/boss-grid/boss-grid-datetime-field.component';
import { DateFormat } from '@boss/DateFormat';
import { BossList } from '@boss/decorator/list/BossList';
import { BossListFilter } from '@boss/decorator/list/BossListFilter';
import { Property } from '@boss/decorator/Property';
import { GoDomainBindingButton } from './buttons/AccountSystemButtons';
import { BossSwitchComponent } from '@boss/bosscontrol/contorl-components/boss-switch.component';
import { Menu } from './Menu';
import { MenuRef } from './MenuRef';
import { PredefinedComponentData } from '../../PredefinedComponentData';
import { BossFileUploadComponent } from '@boss/bosscontrol/contorl-components/boss-file-upload.component';

export function layout(): IBossFormLayout<AccountSystem> {
  return [
    [x => x.SystemId, x => x.OwnerId, x => x.MenuId],
    [x => x.Name],
    [x => x.FavIcon, x => x.Background],
    [x => x.ActiveTime, x => x.ExpiryTime],
    [x => x.Status]
  ];
}


@I18nNamespace('Model.Platform.AccountSystem')
@BossApiModel('api/AccountSystem')
@BossForm(layout())
@BossList({
  actions: [GoDomainBindingButton.provider]
})
export class AccountSystem {

  @Key()// DatabaseGenerated(PlatformSystem.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)
  public Id: number;

  @BossFormControl({
    validator: [Validators.required, Validators.maxLength(100)]
  })
  @BossListField({ linkToView: true })
  @BossListFilter()
  public Name: string;

  @BossFormControl({
    validator: Validators.required,
    component: BossReferenceComponent,
    componentData: {
      modelType: SystemRef,
      field: 'Name'
    }
  })
  @BossListFilter({
    component: BossReferenceComponent,
    componentData: {
      modelType: SystemRef,
      field: 'Name'
    },
    operator: '='
  })
  @Select()
  public SystemId: number;
  @BossListField({
    field: 'System.Name',
    header: 'Name',
    componentData: {
      i18nNamespace: 'Model.Platform.PlatformSystem'
    }
  })

  public System: PlatformSystem;
  @BossFormControl({
    validator: Validators.required,
    component: BossReferenceComponent,
    componentData: {
      modelType: AccountRef,
      field: 'Name'
    }
  })
  @BossListFilter({
    component: BossReferenceComponent,
    componentData: {
      modelType: AccountRef,
      field: 'Name'
    },
    operator: '='
  })
  @Select()
  public OwnerId: number;
  @BossListField({
    field: 'Owner.Name',
    header: 'Name',
    componentData: {
      i18nNamespace: 'Model.Platform.Account'
    }
  })
  public Owner: Account;
  @BossListField({ componentData: PredefinedComponentData.statusEnum, component: BossGridEnumFieldComponent })
  @BossFormControl({ component: BossSwitchComponent })
  public Status: DataStatus;
  @BossFormControl({
    component: BossDatepickerComponent
  })
  @BossListField({
    component: BossGridDatetimeFieldComponent,
    componentData: {
      format: DateFormat.yyMMdd
    }
  })
  public ActiveTime: Date;
  @BossFormControl({
    component: BossDatepickerComponent
  })
  @BossListField({
    component: BossGridDatetimeFieldComponent,
    componentData: {
      format: DateFormat.yyMMdd
    }
  })
  public ExpiryTime: Date;

  @BossListField({ field: 'Menu.Name' })
  public Menu: Menu;
  @BossFormControl({
    component: BossReferenceComponent,
    componentData: {
      modelType: MenuRef,
      field: 'Name'
    }
  })
  public MenuId?: number;

  public CreatedTime: Date;

  public CreatedBy: number;

  public ModifiedTime: Date;

  public LastModifiedBy: number;


  @BossFormControl({
    component: BossFileUploadComponent,
    componentData: {
      layout: 'both',
      extLimit: ['jpg', 'gif', 'png'],
      cropperSize: {
        width: 300,
        height: 200
      },
      fileCountLimit: 5
    }
  })
  public FavIcon: string;
  @BossFormControl({
    component: BossFileUploadComponent,
    componentData: {
      layout: 'both',
      fileCountLimit: 10
    }
  })
  public Background: string;
}
