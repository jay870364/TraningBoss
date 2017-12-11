import { ActivatedRoute } from '@angular/router';
import { Inject, Injectable, EventEmitter, Injector } from '@angular/core';
import { DataSourceFactory } from '@boss/services/datasource/DataSourceFactory';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'environments/environment';
import { IBossFormModel, IBossFormModelSetting } from '@boss/decorator/form/BossFormModel';
import { IDataSource } from '@boss/services/datasource/IDataSource';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { IHttpDataSource } from '@boss/services/datasource/IHttpDataSource';
import { IBossFormMetadata } from '@boss/decorator/form/IBossFormMetadata';
import { BossAutoForm } from './BossAutoForm';
import { IBossListModel, IBossListFilterMetadata } from '@boss/decorator/list/BossListModel';
import { II18nModel } from '../../../decorator/i18n/i18nNs';
import { ControlMetadata } from './ControlMetadata';
@Injectable()
export class BossFilterForm<T> extends BossAutoForm {

  public modelConstructor: constructorof<T>;
  public filters: { formControl: IBossFormMetadata, filter: IBossListFilterMetadata }[];
  constructor(protected controlMetadata: ControlMetadata, protected injector: Injector) {
    super()
  }
  public init(modeType: constructorof<T>) {
    this.modelConstructor = <constructorof<any>>modeType;
    const formModel = this.modelConstructor as any as IBossListModel<any>;
    this.i18nNamespace = (this.modelConstructor as any as II18nModel).defaultNamesapce || 'Model';
    const fg = {};
    const formInjector = Injector.create([{ provide: BossAutoForm, useExisting: BossFilterForm }, { provide: BossFilterForm, useValue: this }], this.injector);
    this.filters = Object.keys(formModel.bossListFilterMetadata || {}).sort((a, b) => (formModel.bossListFilterMetadata[a].order || 0) - (formModel.bossListFilterMetadata[b].order || 0)).map(key => {
      const meta = formModel.bossListFilterMetadata[key];
      const obj = {
        formControl: this.controlMetadata.createMetaData(meta, formInjector),
        filter: meta
      };
      fg[key] = obj.formControl.control;
      return obj;
    });
    this.formGroup = new FormGroup(fg);
  }
}
