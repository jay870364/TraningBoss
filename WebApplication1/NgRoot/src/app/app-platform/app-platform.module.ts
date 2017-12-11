import { LazyPlatformModule } from '@boss/platform/platform.module';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { AppConfiguration } from '@boss/platform/app.configuraton';
import { SystemComponent } from './system/system.component';
import { appRoutes } from './app-platform.route';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RoleComponent } from './role/role.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserFunctionComponent } from './user-function/user-function.component';
import { PLATFORM_MODULE_NAME } from '@boss/platform/Tokens';
import { UserTokenComponent } from './user-token/user-token.component';


@NgModule({
  declarations: [
    SystemComponent,
    MenuComponent,
    RoleComponent,
    UserRoleComponent,
    UserFunctionComponent,
    UserTokenComponent
  ],
  providers: [
    {
      provide: PLATFORM_MODULE_NAME,
      useValue: ['Bossinfo.Module.Platform', 'Bossinfo.Module.GenericManagement', 'Bossinfo.Module.AccountAdmin']
    }
  ],
  imports: [
    CommonModule,
    LazyPlatformModule,

    RouterModule.forChild(appRoutes)
  ]
})
export class AppPlatformModule { }
