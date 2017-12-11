import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DataSourceFactory } from '@boss/services/datasource/DataSourceFactory';
import { PlatformUser, PlatformUserCommandRoles } from '../models/PlatformUser';
import { Role } from '../models/Role';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { PlatformUserRole } from '../models/PlatformUserRole';
import { UserRole } from '@boss/platform/services/UserRole';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss'],
  providers: [UserRole]
})
export class UserRoleComponent implements OnInit {

  public roles: { accountSystemId: number, accountSystemName: string, roles: { role: Role, group: FormGroup }[] }[];
  public array: FormArray;
  public userId: number;
  public getValue() {
    return this.array.value.filter(x => x.Checked);
  }
  public save() {
    this.dsfac.getDataSource(PlatformUserCommandRoles).update(this.userId, this.getValue()).first().subscribe(() => {
      this.router.navigate(['platform', 'user'], { queryParamsHandling: 'merge' });
    });
  }
  public reset() {
    this.dsfac.getDataSource(PlatformUserRole).where('UserId', '=', this.userId).select('RoleId,Id').toSubject().subscribe(current => {
      this.array.controls.forEach(c => {
        const controlRoleId = c.get('RoleId').value;
        const dbrole = current.data.filter(x => x.RoleId === parseFloat(controlRoleId))[0];
        const checked = c.get('Checked');
        checked.setValue(dbrole !== undefined);
      })
    })
  }
  constructor(protected route: ActivatedRoute, protected router: Router, protected dsfac: DataSourceFactory, public userRole: UserRole) {

    route.params.subscribe(data => {
      const userId = parseFloat(data['userid']);
      this.userId = userId;
      dsfac.getDataSource(PlatformUser).where('Id', '=', userId).select('OwnerId').toSubject().subscribe(user => {
        dsfac.getDataSource(Role).where('AccountSystem.OwnerId', '=', user.data[0].OwnerId).select('Name,Id,AccountSystem.SystemId,AccountSystem.System.Name,AccountSystem.Name,AccountSystemId').toSubject().subscribe(roles => {
          this.roles = [];
          const array = new FormArray([]);
          roles.data.forEach((x, i) => {
            let system = this.roles.filter(y => y.accountSystemId === x.AccountSystemId)[0];
            if (!system) {
              system = { accountSystemId: x.AccountSystemId, accountSystemName: x.AccountSystem.Name, roles: [] };
              this.roles.push(system);
            }
            const ctrl = new FormGroup({
              RoleId: new FormControl(x.Id),
              Checked: new FormControl(false)
            });
            system.roles.push({ role: x, group: ctrl });
            array.push(ctrl)
          })
          this.array = array;
          this.reset();
          if (!userRole.hasRole('Modify')) {
            array.disable();
          }
        })
      })
    })

  }

  ngOnInit() {
  }

}
