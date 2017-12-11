import { BossAutoFormComponent } from '@boss/bosscontrol/boss-auto-form/boss-auto-form.component';
import { BossAutoListComponent } from '@boss/bosscontrol/boss-auto-list/boss-auto-list.component';
import { Route } from '@angular/router';
import { UserGuard } from '@boss/platform/guard/user-guard';
import { Category } from './models/Category';
import { Component } from '@angular/core/src/metadata/directives';
import { News } from './models/News';
import { News2} from './models/News2';
// import { appRoutes } from '../app.route';


export const appRoutes: Route[] = [
  { path: `category/createnew`, component: BossAutoFormComponent, data: { modelType: Category, functionName: 'Category' }, canActivate: [UserGuard] },
  { path: `category/:id/view`, component: BossAutoFormComponent, data: { modelType: Category, functionName: 'Category', readonly: true }, canActivate: [UserGuard] },
  { path: `category/:id`, component: BossAutoFormComponent, data: { modelType: Category, functionName: 'Category' }, canActivate: [UserGuard] },
  { path: `category`, component: BossAutoListComponent, data: { modelType: Category, functionName: 'Category' }, canActivate: [UserGuard] },

  { path: `news/createnew`, component: BossAutoFormComponent, data: { modelType: News, functionName: 'News' }, canActivate: [UserGuard] },
  { path: `news/:id/view`, component: BossAutoFormComponent, data: { modelType: News, functionName: 'News', readonly: true }, canActivate: [UserGuard] },
  { path: `news/:id`, component: BossAutoFormComponent, data: { modelType: News, functionName: 'News' }, canActivate: [UserGuard] },
  { path: `news`, component: BossAutoListComponent, data: { modelType: News, functionName: 'News' }, canActivate: [UserGuard] }

  // { path: `news2/createnew`, component: BossAutoFormComponent, data: { modelType: News2, functionName: 'News2' }, canActivate: [UserGuard] },
  // { path: `news2/:id/view`, component: BossAutoFormComponent, data: { modelType: News2, functionName: 'News2', readonly: true }, canActivate: [UserGuard] },
  // { path: `news2/:id`, component: BossAutoFormComponent, data: { modelType: News2, functionName: 'News2' }, canActivate: [UserGuard] },
  // { path: `news2`, component: BossAutoListComponent, data: { modelType: News2, functionName: 'News2' }, canActivate: [UserGuard] }

]
