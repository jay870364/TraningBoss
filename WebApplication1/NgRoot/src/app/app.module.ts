import { BrowserShareModule } from '@boss/share/browser.share.module';
import { PlatformModule } from '@boss/platform/platform.module';
import { NgModule, Injector } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { AppConfiguration } from '@boss/platform/app.configuraton';
import { IndexComponent } from './index/index.component';
import { appRoutes } from './app.route';
import { AppMenu } from './services/AppMenu';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MenuProvider } from '@boss/platform/MenuProvider';
import { LoginPasswordHash } from 'app/tokens';
import { CustomButtons } from '@boss/platform/services/CustomButtons';
import { custombuttonsFactory } from 'app/app.custom-buttons';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    NotFoundComponent
  ],
  entryComponents: [

  ],
  imports: [
    BrowserShareModule,
    PlatformModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    {
      provide: CustomButtons,
      useFactory: custombuttonsFactory,
      deps: [Injector]
    },
    {
      provide: LoginPasswordHash,
      useValue: true
    },
    {
      provide: MenuProvider,
      useClass: AppMenu
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
