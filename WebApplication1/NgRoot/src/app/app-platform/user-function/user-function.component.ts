import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSourceFactory } from '@boss/services/datasource/DataSourceFactory';
import { PlatformUser, PlatformUserCommandFunctions } from '../models/PlatformUser';
import { AccountSystem } from '../models/AccountSystem';
import { FunctionDetial } from '../models/FunctionDetail';
import { SystemFunction } from '../models/SystemFunction';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { FunctionPermissionStatus } from '@enums/FunctionPermissionStatus';
import { IDataSource } from '@boss/services/datasource/IDataSource';
import { EnumHelpers } from '@boss/EnumHelpers';
import { PlatformUserFunction } from '../models/PlatformUserFunction';
import { UserRole } from '@boss/platform/services/UserRole';
import { I18N_NAMESPACE } from '@boss/StringKeys';
interface IRoleData {
  control: FormGroup;
  name: string;
}
interface ISystemFunctionData {
  name: string;
  roles: IRoleData[];
}
interface ISystemData {
  accountSystemName: string;
  accountSystemId: number;
  functions: ISystemFunctionData[]
}
@Component({
  selector: 'app-user-function',
  templateUrl: './user-function.component.html',
  styleUrls: ['./user-function.component.scss'],
  providers: [UserRole]
})
export class UserFunctionComponent implements OnInit {

  public userId: number;
  public accountId: number;
  public array: FormArray;
  public options = EnumHelpers.ConvertToBossControlOptions(FunctionPermissionStatus)
  public permessionStatus = FunctionPermissionStatus;
  public systemFunction: ISystemData[];
  public functionDetails: { [developerName: string]: FunctionDetial };
  public enumI18nKey = I18N_NAMESPACE;
  constructor(protected route: ActivatedRoute, protected router: Router, protected dsfac: DataSourceFactory, public userRole: UserRole) {
    dsfac.getDataSource(FunctionDetial).toSubject().subscribe(response => {
      this.functionDetails = {};
      response.data.forEach(x => this.functionDetails[x.Id] = x);
      this.loadFunctions();
    });
  }
  public save() {
    const value = this.array.value.filter(x => x.Permission !== FunctionPermissionStatus.NotSet);
    this.dsfac.getDataSource(PlatformUserCommandFunctions).update(this.userId, value).first().subscribe(() => {
      this.router.navigate(['platform', 'user'], { queryParamsHandling: 'merge' });
    });
  }
  public reset() {
    const disabled = !this.userRole.hasRole('Modify');
    this.dsfac.getDataSource(PlatformUserFunction).where('UserId', '=', this.userId).select('AccountSystemId,Permission,PermissionRole,DeveloperName,Id').toSubject().subscribe(current => {
      this.array.controls.forEach(c => {
        if (disabled) {
          c.disable();
        } else {
          c.enable();
        }
        const accountSystemId = c.get('AccountSystemId').value;
        const permissionRole = c.get('PermissionRole').value;
        const developerName = c.get('DeveloperName').value;
        const platformUserFunction = current.data.filter(x => x.AccountSystemId === parseFloat(accountSystemId) && x.DeveloperName === developerName && x.PermissionRole === permissionRole)[0];
        const permission = c.get('Permission');
        const id = c.get('Id');
        if (platformUserFunction) {
          id.setValue(platformUserFunction.Id);
          permission.setValue(platformUserFunction.Permission);
        } else {
          id.setValue(null);
          permission.setValue(FunctionPermissionStatus.NotSet);
        }
      })
    })
  }
  protected loadFunctions() {
    this.route.params.subscribe(data => {
      const userId = parseFloat(data['userid']);
      this.userId = userId;
      this.dsfac.getDataSource(PlatformUser).where('Id', '=', userId).select('OwnerId').toSubject().subscribe(user => {
        this.accountId = user.data[0].OwnerId;
        this.dsfac.getDataSource(AccountSystem).where('OwnerId', '=', this.accountId).select('Id,SystemId,Name').toSubject().subscribe(as => {
          this.array = new FormArray([]);
          this.systemFunction = [];
          as.data.forEach(accountSystem => {
            const functions: ISystemFunctionData[] = [];
            this.dsfac.getDataSource(SystemFunction).select('DeveloperName,System,SystemId').where('SystemId', '=', accountSystem.SystemId)
              .toSubject().subscribe(response => {
                response.data.forEach(d => {
                  if (this.functionDetails[d.DeveloperName]) {
                    const roles: IRoleData[] = [];
                    functions.push({ name: d.DeveloperName, roles: roles })
                    this.functionDetails[d.DeveloperName].Roles.forEach(r => {
                      const g = new FormGroup({
                        Id: new FormControl(null),
                        AccountSystemId: new FormControl(accountSystem.Id),
                        DeveloperName: new FormControl(d.DeveloperName, Validators.required),
                        PermissionRole: new FormControl(r.Name, Validators.required),
                        Permission: new FormControl(FunctionPermissionStatus.NotSet)
                      });
                      this.array.push(g);
                      roles.push({ name: r.Name, control: g });
                    });
                  }
                })
                this.reset();
              })
            const sf = { accountSystemId: accountSystem.Id, accountSystemName: accountSystem.Name, functions: functions };
            this.systemFunction.push(sf);
          });
        })
      });
    })
  }
  ngOnInit() {
  }

}
