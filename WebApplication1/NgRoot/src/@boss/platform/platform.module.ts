import { CommonModule } from '@angular/common';
import { BossControlModule } from '../bosscontrol/bosscontrol.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { HttpModule, RequestOptions, XHRBackend, Http } from '@angular/http';
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// services
import { ExtendedXHRBackend } from './ExtendedXHRBackend';
import { AppConfiguration } from './app.configuraton';

// component
import { BossAdminLayoutComponent } from './layout/boss-admin-layout/boss-admin-layout.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { NaviBarComponent } from './navi-bar/navi-bar.component';
import { DataSourceFactory } from '@boss/services/datasource/DataSourceFactory';
import { KeysPipe } from './pipe/keys';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpStatus } from '@boss/services/http/HttpStatus';
import { HttpStatusModule } from '../share/http.status.module';
import { UserGuard } from './guard/user-guard';
import { UserRole } from './services/UserRole';
import { MenuProvider } from './MenuProvider';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    BossAdminLayoutComponent,
    MenuItemComponent,
    NaviBarComponent,
    KeysPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    BossControlModule,
    TranslateModule
  ],
  providers: [
    AppConfiguration,
    {
      provide: XHRBackend,
      useClass: ExtendedXHRBackend
    },
    {
      provide: DataSourceFactory,
      useClass: DataSourceFactory,
      deps: [Http]
    },
    UserGuard,
    MenuProvider
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpModule,
    BossControlModule,
    BossAdminLayoutComponent,
    MenuItemComponent,
    NaviBarComponent,
    KeysPipe
  ]
})
export class PlatformModuleBase { }
@NgModule({
  imports: [
    HttpStatusModule.forRoot(),
    HttpClientModule,
    PlatformModuleBase,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    PlatformModuleBase,
    TranslateModule
  ]
})
export class PlatformModule {

}
@NgModule({
  imports: [
    HttpStatusModule,
    HttpClientModule,
    PlatformModuleBase,
    TranslateModule.forChild({})
  ],
  exports: [
    PlatformModuleBase,
    TranslateModule
  ]
})
export class LazyPlatformModule {

}
