import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PLATFORM_MODULE_NAME } from '@boss/platform/Tokens';
import { LazyPlatformModule } from '@boss/platform/platform.module';
import { appRoutes } from './app-hospital.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  providers: [
    {
      provide: PLATFORM_MODULE_NAME,
      useValue: ['Bossinfo.Module.Hospital']
    }
  ],
  imports: [
    CommonModule,
    LazyPlatformModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: []
})
export class AppHospitalModule { }
