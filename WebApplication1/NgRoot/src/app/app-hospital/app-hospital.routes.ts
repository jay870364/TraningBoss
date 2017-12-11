import { Route } from '@angular/router';
import { BossAutoFormComponent } from '@boss/bosscontrol/boss-auto-form/boss-auto-form.component';
import { BossAutoListComponent } from '@boss/bosscontrol/boss-auto-list/boss-auto-list.component';
import { his } from './models/his';
import { UserGuard } from '@boss/platform/guard/user-guard';
import { Component } from '@angular/core/src/metadata/directives';



export const appRoutes: Route[] = [
  { path: `his/createnew`, component: BossAutoFormComponent, data: { modelType: his, functionName: 'his' }, canActivate: [UserGuard] },
  { path: `his/:id/view`, component: BossAutoFormComponent, data: { modelType: his, functionName: 'his', readonly: true }, canActivate: [UserGuard] },
  { path: `his/:id`, component: BossAutoFormComponent, data: { modelType: his, functionName: 'his' }, canActivate: [UserGuard] },
  { path: `his`, component: BossAutoListComponent, data: { modelType: his, functionName: 'his' }, canActivate: [UserGuard] }
]
