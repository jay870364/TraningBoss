import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpStatus } from '../services/http/HttpStatus';
import { Identity } from '../services/Identity';

@NgModule()
export class HttpStatusModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: HttpStatusModule,
      providers: [
        HttpStatus,
        Identity
      ]
    }
  }
}
