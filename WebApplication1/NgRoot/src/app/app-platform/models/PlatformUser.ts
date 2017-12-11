import { PlatformProvider } from './../../../@boss/PlatformProvider';
import { OdataDataSource } from '@boss/services/datasource/odata/OdataDatasource';
import { ActivatedRoute } from '@angular/router';
import { BossApiModel, Key, Select } from '@boss/decorator/BossApiModel';
import { Role } from './Role';
import { DataStatus } from '@enums/DataStatus';
import { Validators } from '@angular/forms';
import { BossListField } from '@boss/decorator/list/BossListField';
import { PredefinedComponentData } from '../../PredefinedComponentData';
import { BossGridEnumFieldComponent } from '@boss/bosscontrol/boss-grid/boss-grid-enum-field.component';
import { BossSwitchComponent } from '@boss/bosscontrol/contorl-components/boss-switch.component';
import { BossReferenceComponent } from '@boss/bosscontrol/contorl-components/boss-reference.component';
import { AccountRef } from './AccountRef';
import { BossListFilter } from '@boss/decorator/list/BossListFilter';
import { I18nNamespace } from '@boss/decorator/i18n/i18nNs';
import { BossFormControl } from '@boss/decorator/form/BossFormControl';
import { IBossFormLayout } from '@boss/decorator/form/BossForm';
import { BossForm } from '@boss/decorator/form/BossForm';
import { CustomValidators } from '@boss/CustomValidators';
import { BossFormSubmit, BossFormLoadHandler, IFormLoadContext } from '@boss/bosscontrol/services/form/BossFormBase';
import * as SHA512 from 'crypto-js/sha512';
import { BossPasswordComponent } from '@boss/bosscontrol/contorl-components/boss-password.component';
import { UserRoleButton } from './buttons/UserRoleButton';
import { BossList } from '@boss/decorator/list/BossList';
import { UserPermissionButton } from './buttons/UserPermissionButton';
import { UserTokenButton } from './buttons/UserTokenButton';
import { HideIfNoModuleRole } from './HideIfNoModuleRole';
import { Injectable, Inject } from '@angular/core';
import { BossFormLoad } from '@boss/bosscontrol/services/form/BossFormBase';
import { UserRole } from '@boss/platform/services/UserRole';
import { Identity } from '@boss/services/Identity';
import { RBUType } from '@enums/EDI';
import { BossCheckboxlistComponent } from '@boss/bosscontrol/contorl-components/boss-checkboxlist.component';
import { EnumHelpers } from '@boss/EnumHelpers';
import { Guid } from '@boss/Guid';
import { ModelTypeOptionProvider } from '@boss/bosscontrol/services/ModelTypeOptionProvider';
import { IBossControlOption } from '@boss/bosscontrol/contorl-components/IBossControlOption';
import { IListLoader } from '@boss/bosscontrol/services/ListLoader';
import { IHttpDataSource } from '@boss/services/datasource/IHttpDataSource';
import { BossAutoGridComponent } from '@boss/bosscontrol/boss-auto-grid/boss-auto-grid.component';
import { LoginToUserButton } from './buttons/LoginToUserButton';

export function layout(): IBossFormLayout<PlatformUser> {
  return [
    [x => x.OwnerId],
    [x => x.Name, x => x.Account],
    [x => x.Password, x => x.ConfirmPassword],
    [x => x.Email],
    [x => x.Status]
  ]
}
export const submit: BossFormSubmit<PlatformUser> = function (context, ok, cancel) {
  const value = Object.assign({}, context.value);
  if (value.Password) {
    value.Password = SHA512(value.Password).toString();
  }
  ok(value);
}
export class Load implements BossFormLoadHandler<PlatformUser> {
  constructor(protected userRole: UserRole, protected identity: Identity) {

  }
  public load(context: IFormLoadContext<PlatformUser>, load: () => void) {
    if (!this.userRole.hasRole('Bossinfo.Module.Platform')) {
      context.form.modelChanged.subscribe(() => {
        if (context.form.model.OwnerId === undefined) {
          context.form.model.OwnerId = this.identity.identity.AccountId;
        }
      })
    }
    load();
  }
}
export const loaderProvider = new PlatformProvider(Load, [UserRole, Identity]);

export class UserListLoad implements IListLoader<PlatformUser> {
  protected displayOnly = ['Name', 'Account', 'Email', 'Status'];
  loader(source: OdataDataSource<PlatformUser>, load: (source: IHttpDataSource<PlatformUser>) => void) {
    this.route.queryParams.subscribe(qs => {
      const loadAll = qs['a'] === 'yes';
      const loadAccount = qs['ac'] === 'yes';
      if (!loadAll && !loadAccount) {
        source = source.where(`AccountSystemIDs/any(x:x eq ${this.identity.identity.AccountSystemId})`);
      } else if (loadAccount) {
        source = source.where('OwnerId', '=', this.identity.identity.AccountId);
      }
      load(source)
    })

  }
  constructor(protected route: ActivatedRoute, protected identity: Identity, protected userRole: UserRole, protected grid: BossAutoGridComponent) {
    this.grid.fieldsReady.subscribe(ok => {
      if (ok) {
        if (route.snapshot.queryParams['a'] !== 'yes') {
          this.grid.fields.forEach(f => {
            if (f.field) {
              f.visible = this.displayOnly.indexOf(f.field) >= 0;
            }
          });
        }
      }
    })
  }

}
export const userListLoadProvider = new PlatformProvider(UserListLoad, [ActivatedRoute, Identity, UserRole, BossAutoGridComponent]);
@BossApiModel('api/PlatformUser')
@I18nNamespace('Model.Platform.PlatformUser')
@BossForm(layout(), {
  submit: submit,
  loadHandler: loaderProvider,
  actions: [UserRoleButton.provider, UserPermissionButton.provider, LoginToUserButton.provider]
})
@BossList({
  actions: [UserRoleButton.provider, UserPermissionButton.provider, UserTokenButton.provider, LoginToUserButton.provider],
  loader: userListLoadProvider
})
export class PlatformUser {





  // DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)
  @Key()
  public Id: number;
  // EmailAddress()// Required()// StringLength(300)
  @BossFormControl({
    validator: [Validators.required, Validators.email, Validators.maxLength(300)]
  })
  @BossListFilter()
  @BossListField()
  public Email: string;

  @BossListField()
  @BossListFilter()
  @BossFormControl({
    validator: [Validators.required, Validators.maxLength(300)]
  })
  public Account: string;

  @BossListField({ linkToView: true })
  @BossListFilter()
  @BossFormControl({
    validator: [Validators.required, Validators.maxLength(300)]
  })
  public Name: string;

  @BossFormControl({
    validatorType: CustomValidators.RequiredIfCreating,
    component: BossPasswordComponent
  })
  public Password: string;

  @BossFormControl({
    component: BossPasswordComponent,
    asyncValidatorType: [CustomValidators.sameAsAsync('Password', 'Model.PlatformUser.Password')]
  })
  public ConfirmPassword: string

  public Roles: Role[];

  public CreatedTime: Date;

  public CreatedBy: number;

  public LastModifiedTime: Date;

  public LastModifiedBy: number;

  @Select()
  @BossFormControl({
    validator: Validators.required,
    component: BossReferenceComponent,
    warpperControl: HideIfNoModuleRole.provider,
    componentData: {
      modelType: AccountRef,
      field: 'Name'
    }
  })
  @BossListFilter({
    warpperControl: HideIfNoModuleRole.provider,
    component: BossReferenceComponent,
    componentData: {
      modelType: AccountRef,
      field: 'Name'
    },
    operator: '='
  })
  public OwnerId: number;

  @BossListField({ field: 'Owner.Name' })
  public Owner: Account;

  @BossListField({ componentData: PredefinedComponentData.statusEnum, component: BossGridEnumFieldComponent })
  @BossFormControl({ component: BossSwitchComponent })
  public Status: DataStatus;
}
@BossApiModel('api/PlatformUser/$roles')
export class PlatformUserCommandRoles {

}
@BossApiModel('api/PlatformUser/$functions')
export class PlatformUserCommandFunctions {

}
