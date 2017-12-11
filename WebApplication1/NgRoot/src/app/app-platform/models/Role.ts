import { PlatformProvider } from '@boss/PlatformProvider';
import { ActivatedRoute } from '@angular/router';


import { BossApiModel, Key, Select } from '@boss/decorator/BossApiModel';
import { DataStatus } from '@enums/DataStatus';
import { BossListField } from '@boss/decorator/list/BossListField';
import { BossFormControl } from '@boss/decorator/form/BossFormControl';
import { Validators } from '@angular/forms';
import { BossReferenceComponent } from '@boss/bosscontrol/contorl-components/boss-reference.component';
import { AccountRef } from './AccountRef';
import { I18nNamespace } from '@boss/decorator/i18n/i18nNs';
import { BossTextareaComponent } from '@boss/bosscontrol/contorl-components/boss-textarea.component';
import { BossSwitchComponent } from '@boss/bosscontrol/contorl-components/boss-switch.component';
import { BossGridEnumFieldComponent } from '@boss/bosscontrol/boss-grid/boss-grid-enum-field.component';
import { BossForm, IBossFormLayout } from '@boss/decorator/form/BossForm';
import { BossListFilter } from '@boss/decorator/list/BossListFilter';
import { AccountSystem } from './AccountSystem';
import { AccountSystemRef } from './AccountSystemRef';
import { PredefinedComponentData } from '../../PredefinedComponentData';
import { Expand } from '@boss/decorator/BossApiModel';
import { SystemRef } from './SystemRef';
import { RoleFunction } from './RoleFunction';
import { HideIfNoModuleRole } from 'app/app-platform/models/HideIfNoModuleRole';
import { Injectable } from '@angular/core';
import { UserRole } from '@boss/platform/services/UserRole';
import { IListLoader } from '@boss/bosscontrol/services/ListLoader';
import { IHttpDataSource } from '@boss/services/datasource/IHttpDataSource';
import { BossGridComponent } from '@boss/bosscontrol/boss-grid/boss-grid.component';
import { BossAutoGridComponent } from '@boss/bosscontrol/boss-auto-grid/boss-auto-grid.component';
import { BossList } from '@boss/decorator/list/BossList';


export class RoleListLoad implements IListLoader<Role> {
  protected displayOnly = ['Name', 'Status'];
  protected displayOnlyAccount = ['Name', 'Status', 'AccountSystem.Name'];
  loader(source: IHttpDataSource<Role>, load: (source: IHttpDataSource<Role>) => void) {
    load(source)
  }
  constructor(protected route: ActivatedRoute, protected userRole: UserRole, protected grid: BossAutoGridComponent) {
    this.grid.fieldsReady.subscribe(ok => {
      if (ok) {
        route.queryParams.subscribe(qs => {
          if (qs['a'] !== 'yes') {
            this.grid.fields.forEach(f => {
              if (f.field) {
                f.visible = (qs['ac'] === 'yes' ? this.displayOnlyAccount : this.displayOnly).indexOf(f.field) >= 0;
              }
            });
          }
        })

      }
    })
  }
}
export const roleListLoadProvider = new PlatformProvider(RoleListLoad, [ActivatedRoute, UserRole, BossAutoGridComponent]);
@BossApiModel('api/Role')
@I18nNamespace('Model.Platform.Role')
@BossList({
  loader: roleListLoadProvider
})
export class Role {

  @Key()// DatabaseGenerated(PlatformSystem.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)
  public Id: number;
  // StringLength(50)// Required()
  @BossListField({ linkToView: true })
  @BossListFilter()
  public Name: string;
  // MaxLength()
  @BossFormControl({ component: BossTextareaComponent })
  public Remark: string;

  @BossListField({ componentData: PredefinedComponentData.statusEnum, component: BossGridEnumFieldComponent })
  public Status: DataStatus = 0;


  public AccountSystemId: number;

  @BossListField({
    field: 'AccountSystem.Name'
  })
  @BossListFilter({ field: 'OwnerId', warpperControl: HideIfNoModuleRole.provider, component: BossReferenceComponent, componentData: { modelType: AccountRef, field: 'Name' }, operator: '=' })
  @BossListFilter({ field: 'SystemId', warpperControl: HideIfNoModuleRole.provider, component: BossReferenceComponent, componentData: { modelType: SystemRef, field: 'Name' }, operator: '=' })
  @BossListField({ field: 'AccountSystem.System.Name' })
  @BossListField({ field: 'AccountSystem.Owner.Name' })
  public AccountSystem: AccountSystem;

  public RoleFunctions: RoleFunction[];
}
