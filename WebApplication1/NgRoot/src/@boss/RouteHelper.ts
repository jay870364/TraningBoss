import { BossAutoFormComponent } from '@boss/bosscontrol/boss-auto-form/boss-auto-form.component';
import { BossAutoListComponent } from '@boss/bosscontrol/boss-auto-list/boss-auto-list.component';
import { UserGuard } from '@boss/platform/guard/user-guard';
import { Route } from '@angular/router';

export function buildRoute<T>(modelType: constructorof<T>, functionName: string): Route[] {
    return [
        { path: `${functionName}/createnew`, component: BossAutoFormComponent, data: { modelType: modelType, functionName: functionName }, canActivate: [UserGuard] },
        { path: `${functionName}/:id/view`, component: BossAutoFormComponent, data: { modelType: modelType, functionName: functionName, readonly: true }, canActivate: [UserGuard] },
        { path: `${functionName}/:id`, component: BossAutoFormComponent, data: { modelType: modelType, functionName: functionName }, canActivate: [UserGuard] },
        { path: `${functionName}`, component: BossAutoListComponent, data: { modelType: modelType, functionName: functionName }, canActivate: [UserGuard] }
    ];
}
