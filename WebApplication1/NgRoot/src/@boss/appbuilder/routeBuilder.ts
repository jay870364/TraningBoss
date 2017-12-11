import { Route, Routes } from '@angular/router';
import { BossAutoListComponent } from '../bosscontrol/boss-auto-list/boss-auto-list.component';
import { BossAutoFormComponent } from '../bosscontrol/boss-auto-form/boss-auto-form.component';
import { Component, Type } from '@angular/core';

export function buildFormRoute<T>(modelType: constructorof<T>, name: string, customComponent?: Type<any>) {
  return [{ path: `${name}/createnew`, component: customComponent || BossAutoFormComponent, data: { modelType: modelType, listUrl: `/${name}` } },
  { path: `${name}/:id/view`, component: customComponent || BossAutoFormComponent, data: { modelType: modelType, readonly: true, listUrl: `/${name}` } },
  { path: `${name}/:id`, component: customComponent || BossAutoFormComponent, data: { modelType: modelType, listUrl: `/${name}` } }];
}
export function buildListRoute<T>(modelType: constructorof<T>, name: string, customComponent?: Type<any>) {
  return [{ path: `${name}`, component: customComponent || BossAutoListComponent, data: { modelType: modelType } }];
}

export function buildFunctionRoute<T>(modelType: constructorof<T>, name: string, cutomFormComponent?: Type<any>, customListComponent?: Type<any>) {
  return buildFormRoute(modelType, name, cutomFormComponent).concat(buildListRoute(modelType, name, customListComponent) as any);
}
