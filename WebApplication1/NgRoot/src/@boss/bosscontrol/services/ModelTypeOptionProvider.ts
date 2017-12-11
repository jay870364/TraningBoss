import { Injectable, Inject } from '@angular/core';
import { IBossOptionProvider } from './IBossOptionProvider';
import { Observable } from 'rxjs/Observable';
import { IBossControlOption } from '@boss/bosscontrol/contorl-components/IBossControlOption';
import { DataSourceFactory } from '../../services/datasource/DataSourceFactory';
import { Subject } from 'rxjs/Subject';
@Injectable()
export abstract class ModelTypeOptionProvider<T> implements IBossOptionProvider {
  options: Observable<IBossControlOption[]>;
  protected abstract getModelType(): constructorof<T>;
  protected abstract mapper(model: T): IBossControlOption;
  constructor( @Inject(DataSourceFactory) dsfac: DataSourceFactory) {
    if (this.getModelType()) {
      this.options = dsfac.getDataSource(this.getModelType()).toSubject().map(d => d.data.map(this.mapper)).first();
    } else {
      console.error('modelType undefined', this.getModelType());
      this.options = new Subject<IBossControlOption[]>().asObservable();
    }
  }
}
