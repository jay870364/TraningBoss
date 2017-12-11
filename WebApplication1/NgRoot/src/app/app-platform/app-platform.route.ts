import { SystemDomainBinding } from './models/SystemDomainBinding';
import { PlatformSystem } from './models/PlatformSystem';
import { Role } from './models/Role';
import { AccountSystem } from './models/AccountSystem';
import { Account } from './models/Account';
import { SystemComponent } from './system/system.component';
import { buildFormRoute, buildFunctionRoute } from '@boss/appbuilder/routeBuilder';
import { BossAutoFormComponent } from '@boss/bosscontrol/boss-auto-form/boss-auto-form.component';
import { BossAutoListComponent } from '@boss/bosscontrol/boss-auto-list/boss-auto-list.component';
import { Route } from '@angular/router';
import { Menu } from './models/Menu';
import { MenuItem } from './models/MenuItem';
import { MenuComponent } from './menu/menu.component';
import { RoleComponent } from './role/role.component';
import { PlatformUser } from './models/PlatformUser';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserFunctionComponent } from './user-function/user-function.component';
import { UserGuard } from '@boss/platform/guard/user-guard';
import { UserTokenComponent } from './user-token/user-token.component';



export const appRoutes: Route[] = [
  { path: `account/createnew`, component: BossAutoFormComponent, data: { modelType: Account, functionName: 'Account' }, canActivate: [UserGuard] },
  { path: `account/:id/view`, component: BossAutoFormComponent, data: { modelType: Account, functionName: 'Account', readonly: true }, canActivate: [UserGuard] },
  { path: `account/:id`, component: BossAutoFormComponent, data: { modelType: Account, functionName: 'Account' }, canActivate: [UserGuard] },
  { path: `account`, component: BossAutoListComponent, data: { modelType: Account, functionName: 'Account' }, canActivate: [UserGuard] },

  { path: `accountsystem/createnew`, component: BossAutoFormComponent, data: { modelType: AccountSystem, functionName: 'AccountSystem' }, canActivate: [UserGuard] },
  { path: `accountsystem/:id/view`, component: BossAutoFormComponent, data: { modelType: AccountSystem, functionName: 'AccountSystem', readonly: true }, canActivate: [UserGuard] },
  { path: `accountsystem/:id`, component: BossAutoFormComponent, data: { modelType: AccountSystem, functionName: 'AccountSystem' }, canActivate: [UserGuard] },
  { path: `accountsystem`, component: BossAutoListComponent, data: { modelType: AccountSystem, functionName: 'AccountSystem' }, canActivate: [UserGuard] },

  { path: `role/createnew`, component: RoleComponent, data: { modelType: Role, functionName: 'Role' }, canActivate: [UserGuard] },
  { path: `role/:id/view`, component: RoleComponent, data: { modelType: Role, functionName: 'Role', readonly: true }, canActivate: [UserGuard] },
  { path: `role/:id`, component: RoleComponent, data: { modelType: Role, functionName: 'Role' }, canActivate: [UserGuard] },
  { path: `role`, component: BossAutoListComponent, data: { modelType: Role, functionName: 'Role' }, canActivate: [UserGuard] },

  { path: `system/createnew`, component: SystemComponent, data: { modelType: PlatformSystem, functionName: 'System' }, canActivate: [UserGuard] },
  { path: `system/:id/view`, component: SystemComponent, data: { modelType: PlatformSystem, functionName: 'System', readonly: true }, canActivate: [UserGuard] },
  { path: `system/:id`, component: SystemComponent, data: { modelType: PlatformSystem, functionName: 'System' }, canActivate: [UserGuard] },
  { path: `system`, component: BossAutoListComponent, data: { modelType: PlatformSystem, functionName: 'System' }, canActivate: [UserGuard] },

  { path: `systemdomainbinding/createnew`, component: BossAutoFormComponent, data: { modelType: SystemDomainBinding, functionName: 'SystemDomainBinding' }, canActivate: [UserGuard] },
  { path: `systemdomainbinding/:id/view`, component: BossAutoFormComponent, data: { modelType: SystemDomainBinding, functionName: 'SystemDomainBinding', readonly: true }, canActivate: [UserGuard] },
  { path: `systemdomainbinding/:id`, component: BossAutoFormComponent, data: { modelType: SystemDomainBinding, functionName: 'SystemDomainBinding' }, canActivate: [UserGuard] },
  { path: `systemdomainbinding`, component: BossAutoListComponent, data: { modelType: SystemDomainBinding, functionName: 'SystemDomainBinding' }, canActivate: [UserGuard] },

  { path: `menu/createnew`, component: MenuComponent, data: { modelType: Menu, functionName: 'Menu' }, canActivate: [UserGuard] },
  { path: `menu/:id/view`, component: MenuComponent, data: { modelType: Menu, functionName: 'Menu', readonly: true }, canActivate: [UserGuard] },
  { path: `menu/:id`, component: MenuComponent, data: { modelType: Menu, functionName: 'Menu' }, canActivate: [UserGuard] },
  { path: `menu`, component: BossAutoListComponent, data: { modelType: Menu, functionName: 'Menu' }, canActivate: [UserGuard] },

  { path: `user/createnew`, component: BossAutoFormComponent, data: { modelType: PlatformUser, functionName: 'User' }, canActivate: [UserGuard] },
  { path: `user/:id/view`, component: BossAutoFormComponent, data: { modelType: PlatformUser, functionName: 'User', readonly: true }, canActivate: [UserGuard] },
  { path: `user/:id`, component: BossAutoFormComponent, data: { modelType: PlatformUser, functionName: 'User' }, canActivate: [UserGuard] },
  { path: `user`, component: BossAutoListComponent, data: { modelType: PlatformUser, functionName: 'User' }, canActivate: [UserGuard] },
  { path: `user/role/:userid`, component: UserRoleComponent, canActivate: [UserGuard], data: { functionName: 'User' } },
  { path: `user/function/:userid`, component: UserFunctionComponent, canActivate: [UserGuard], data: { functionName: 'User' } },
  { path: `user/token/:userid`, component: UserTokenComponent, canActivate: [UserGuard], data: { functionName: 'User' } },
];
