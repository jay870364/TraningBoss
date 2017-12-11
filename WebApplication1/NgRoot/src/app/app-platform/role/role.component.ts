import { Component, OnInit } from '@angular/core';
import { BossFormBase } from '@boss/bosscontrol/services/form/BossFormBase';
import { BossAutoForm } from '@boss/bosscontrol/services/form/BossAutoForm';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Role } from '../models/Role';
import { DataSourceFactory } from '@boss/services/datasource/DataSourceFactory';
import { AccountSystemRef } from '../models/AccountSystemRef';
import { RoleFunction } from '../models/RoleFunction';
import { IDataSource } from '@boss/services/datasource/IDataSource';
import { AccountSystem } from '../models/AccountSystem';
import { SystemFunction } from '../models/SystemFunction';
import { FunctionPermissionStatus } from '../../../@enums/FunctionPermissionStatus';
import { EnumHelpers } from '@boss/EnumHelpers';
import { FunctionDetial } from '../models/FunctionDetail';
import { UserRole } from '@boss/platform/services/UserRole';
import { ComponentData } from '../models/ComponentData';
import { Identity } from '@boss/services/Identity';
import { RBUType } from '../../../@enums/EDI';
import { I18N_NAMESPACE } from '@boss/StringKeys';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  providers: [UserRole, BossFormBase, { provide: BossAutoForm, useExisting: BossFormBase }]
})
export class RoleComponent implements OnInit {
  public accountSystemSelector = ComponentData.accountSystemSelector;
  public systemFunctionDs: IDataSource<SystemFunction>;
  public formGroup: FormGroup;
  public options = EnumHelpers.ConvertToBossControlOptions(FunctionPermissionStatus)
  public permessionStatus = FunctionPermissionStatus;
  public functionDetails: { [developerName: string]: FunctionDetial };
  public roleMapping: { [developerNamePlusRoleName: string]: FormGroup }
  public enumI18nKey = I18N_NAMESPACE;
  public roleArray = new FormArray([]);
  protected accountSystemId: number;
  public getRoleControl(developerName: string, roleName: string) {
    return this.roleMapping[`${developerName}-${roleName}`];
  }

  constructor(public form: BossFormBase<Role>, protected dsFac: DataSourceFactory, public userRole: UserRole, protected identity: Identity) {
    this.roleMapping = {};
    this.form.buildModelFormRoute();
    dsFac.getDataSource(FunctionDetial).toSubject().subscribe(response => {
      this.functionDetails = {};
      response.data.forEach(x => this.functionDetails[x.Id] = x);
      this.initForm();
    })


  }
  protected fillPermission() {
    if (this.form.keyOrCloneKey) {
      this.dsFac.getDataSource(RoleFunction).where('RoleId', '=', this.form.keyOrCloneKey).toSubject().subscribe(r => {
        r.data.forEach(v => {
          const g = this.getRoleControl(v.DeveloperName, v.PermissionRole);
          if (g) {
            g.get('Permission').setValue(v.Permission)
            g.get('Id').setValue(v.Id)
          }
        })
        this.form.model.RoleFunctions = this.roleArray.getRawValue();
      });
    } else {
      this.roleArray.controls.forEach(c => c.get('Permission').setValue(FunctionPermissionStatus.NotSet));
      this.form.model.RoleFunctions = this.roleArray.getRawValue();
    }

  }
  protected setRoles() {
    while (this.roleArray.length) {
      this.roleArray.removeAt(0);
    }
    if (this.accountSystemId) {
      this.dsFac.getDataSource(AccountSystem).get(this.accountSystemId).subscribe(as => {
        this.dsFac.getDataSource(SystemFunction).where('SystemId', '=', as.SystemId).toSubject().subscribe(response => {
          const functions = response.data.filter(x => this.functionDetails[x.DeveloperName]);
          functions.forEach(d => {
            this.functionDetails[d.DeveloperName].Roles.forEach(r => {
              const g = new FormGroup({
                Id: new FormControl(null),
                DeveloperName: new FormControl(d.DeveloperName, Validators.required),
                PermissionRole: new FormControl(r.Name, Validators.required),
                Permission: new FormControl(FunctionPermissionStatus.NotSet)
              });
              this.roleArray.push(g);
              this.roleMapping[`${d.DeveloperName}-${r.Name}`] = g;
            });
          })
          this.systemFunctionDs = this.dsFac.getDataSource(functions);
          this.fillPermission();
          if (this.form.isReadonly) {
            this.roleArray.disable({ onlySelf: false });
          }
        })
      })
    } else {
      this.systemFunctionDs = null;
    }
  }
  protected initForm() {
    const formGroup = new FormGroup({
      Name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      AccountSystemId: new FormControl(null, [Validators.required]),
      Status: new FormControl(null),
      RoleFunctions: this.roleArray
    });

    this.formGroup = formGroup;
    this.formGroup.get('AccountSystemId').valueChanges.subscribe((value) => {
      if (value !== this.accountSystemId) {
        this.accountSystemId = value;
        this.setRoles();
      }
    })
    this.form.init(this.formGroup);
    this.form.modelChanged.subscribe(() => {
      if (!this.userRole.hasRole('Bossinfo.Module.Platform') && this.form.model.AccountSystemId === undefined) {
        this.form.model.AccountSystemId = this.identity.identity.AccountSystemId;
      }
    })
    this.form.checkReadyOnly();
    this.form.enableBackWhenSaved();
    if (this.form.isReadonly) {
      this.roleArray.disable({ onlySelf: false });
    }
  }
  ngOnInit() {
  }

}
