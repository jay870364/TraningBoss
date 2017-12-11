import { Route } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { UserGuard } from '@boss/platform/guard/user-guard';



export const appRoutes: Route[] = [
  { path: '', component: IndexComponent, canActivate: [UserGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'platform', loadChildren: './app-platform/app-platform.module#AppPlatformModule' },
  { path: 'helloworld', loadChildren: './app-hello-world/app-hello-world.module#AppHelloWorldModule'},
  { path: 'hospital', loadChildren: './app-hospital/app-hospital.module#AppHospitalModule'}
  // { path: '**', redirectTo: '' }
];
