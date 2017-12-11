import { Injectable, Injector } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { BossGridComponent } from '@boss/bosscontrol/boss-grid/boss-grid.component';
import { BossEditForm } from './form/BossEditForm';
import { DataSourceResponse } from '../../services/datasource/DataSourceResponse';
import { II18nModel } from '../../decorator/i18n/i18nNs';
import { IBossFormModel } from '../../decorator/form/BossFormModel';
import { IBossFormMetadata } from '../../decorator/form/IBossFormMetadata';
import { ControlMetadata } from './form/ControlMetadata';
import { DataSourceFactory } from '../../services/datasource/DataSourceFactory';
import { IHttpDataSource } from '../../services/datasource/IHttpDataSource';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class BossAutoGridEdit {
  public formArray: FormArray;
  public i18nNamespace: string;
  public httpds: IHttpDataSource<any>;
  constructor(protected injector: Injector, protected dsfac: DataSourceFactory, protected controlMetadata: ControlMetadata) {

  }
  public save(): Promise<void> {
    this.formArray.updateValueAndValidity({ onlySelf: false });
    return new Promise(ok => {
      setTimeout(() => {
        if (this.formArray.valid) {
          this.formArray.controls.filter(x => x.touched).map(x => x.value)
            .map(x => (next: () => void) => {
              this.httpds.update(x[this.httpds.identityProperty], x).first().subscribe(next)
            }).reduce((sum, next) => (nn) => next(() => sum(nn)), next => next())(ok);
        }
      })
    });
  }
  public init(grid: BossGridComponent, modelType: constructorof<any>) {
    const injector = Injector.create([{ provide: BossAutoGridEdit, useValue: this }], this.injector);
    const formModel = modelType as any as IBossFormModel<any>;
    this.i18nNamespace = (modelType as any as II18nModel).defaultNamesapce || 'Model';
    const settings = formModel.bossFormModelSetting || {};
    this.httpds = this.dsfac.getDataSource(modelType);
    const fields = Object.keys(settings);
    fields.push(this.httpds.identityProperty);
    grid.dataRefresh.subscribe((data: DataSourceResponse<any>) => {
      if (!this.formArray || data.data.length !== this.formArray.length) {
        const array = new FormArray([]);
        data.data.map(x => {
          const fg = {};
          fields.forEach(f => fg[f] = settings[f] ? this.controlMetadata.createControl(settings[f], injector) : new FormControl());
          const formgroup = new FormGroup(fg);
          array.push(formgroup);
        })
        this.formArray = array;
      }
    })
  }
}
