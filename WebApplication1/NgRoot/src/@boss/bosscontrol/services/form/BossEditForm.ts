import { ActivatedRoute, Router } from '@angular/router';
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

import { BossFormBase } from './BossFormBase';
import { IBossFormSubLayout, BossFormRowLayout } from '../../../decorator/form/BossFormLayout';
import { IBossActionButton } from '../../../decorator/IBossActionButton';
import { II18nModel } from '../../../decorator/i18n/i18nNs';
import { ActionButton } from '../ActionButton';
import { FormGroupHelper } from '../FormGroupHelper';
import { ValueOrArrayResolver } from '../../../ValueOrArrayResolver';
import { ControlMetadata } from './ControlMetadata';
import { Lazy } from '../../../Lazy';
import { BossFormLoadHandler } from '@boss/bosscontrol/services/form/BossFormBase';
export interface IFormSubmitContext<T> {
  datasource: IHttpDataSource<T>
  form: BossEditForm<T>
}
export interface IFormLoadContext<T> {
  datasource: IHttpDataSource<T>
  form: BossEditForm<T>
}

@Injectable()
export class BossEditForm<T> extends BossFormBase<T> {
  public formLayout: IBossFormSubLayout<any>[];
  public actions: IBossActionButton<T>[];

  public buildModelType(constructor: constructorof<any>) {
    this.modelConstructor = constructor;
    const formModel = this.modelConstructor as any as IBossFormModel<any>;
    this.i18nNamespace = (this.modelConstructor as any as II18nModel).defaultNamesapce || 'Model';
    this.datasource = this.factory.getDataSource(this.modelConstructor);
    const formInjector = Injector.create([{ provide: BossEditForm, useValue: this }, { provide: BossFormBase, useExisting: BossEditForm }], this.injector);
    const settings = formModel.bossFormModelSetting || {};
    const created: IKeyValuePair<IBossFormMetadata> = {};
    const fg = {};
    Object.keys(settings).forEach((key) => {
      created[key] = this.controlMetadata.createMetadataFromSetting(settings[key], formInjector);
      fg[key] = created[key].control;
    });
    const formgroup = new FormGroup(fg);
    if (!formModel.bossFormLayout) {
      formModel.bossFormLayout = [];
      for (const k of Object.keys(formgroup.controls)) {
        formModel.bossFormLayout.push(new BossFormRowLayout([<PropertyExpression<any>>new Function('x', `return x.${k};`)]));
      }
    }
    this.formLayout = formModel.bossFormLayout.map(x => x.getLayout(created));
    const acitonConstructors = (formModel.bossFormActions || []);
    this.actions = this.actionButton.createButtons(acitonConstructors, formInjector);
    const handlerLoads = [];
    if (formModel.bossFormLoadHandler) {
      const secInjector = Injector.create(formModel.bossFormLoadHandler.map(x => x.provider), formInjector);
      formModel.bossFormLoadHandler.forEach(x => {
        const handler = x.get(secInjector) as BossFormLoadHandler<T>;
        handlerLoads.push((c, l) => handler.load(c, l));
      });
    }
    this.init(formgroup, formModel.bossFormSubmit, (formModel.bossFormLoad || []).concat(handlerLoads));
  }
  constructor(protected route: ActivatedRoute, protected router: Router, protected factory: DataSourceFactory,
    protected actionButton: ActionButton, protected injector: Injector, protected formGroupHelper: FormGroupHelper, protected controlMetadata: ControlMetadata) {
    super(route, router, factory, actionButton, injector, formGroupHelper, controlMetadata);
  }
}
