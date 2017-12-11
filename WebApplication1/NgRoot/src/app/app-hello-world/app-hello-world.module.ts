import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PLATFORM_MODULE_NAME } from '@boss/platform/Tokens';
import { LazyPlatformModule } from '../../@boss/platform/platform.module';
import { appRoutes } from './app-hello-world.routes';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LazyPlatformModule,
    RouterModule.forChild(appRoutes)
  ],
  providers: [
    {
    provide: PLATFORM_MODULE_NAME,
    useValue: ['Bossinfo.Module.HelloWorld']
    }
  ]
})
export class AppHelloWorldModule { }
