import { ActivatedRoute, Router } from '@angular/router';
import { Inject, Injectable, EventEmitter, Injector, Pipe } from '@angular/core';
import { DataSourceFactory } from '@boss/services/datasource/DataSourceFactory';
import { FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { environment } from 'environments/environment';
import { IBossFormModel, IBossFormModelSetting } from '@boss/decorator/form/BossFormModel';
import { IDataSource } from '@boss/services/datasource/IDataSource';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { IHttpDataSource } from '@boss/services/datasource/IHttpDataSource';
import { IBossFormMetadata } from '@boss/decorator/form/IBossFormMetadata';
import { BossAutoForm } from './BossAutoForm';
import { BehaviorSubject, Subject, ReplaySubject } from 'rxjs/Rx';
import { ValueOrArrayResolver } from '../../../ValueOrArrayResolver';
import { ValueOrArray } from '../../../ValueOrArray';
import { Lazy } from '../../../Lazy';
import { ActionButton } from '../ActionButton';
import { FormGroupHelper } from '../FormGroupHelper';
import { ControlMetadata } from './ControlMetadata';
export type BossFormSubmit<T> = (context: IFormSubmitContext<T>, submit: (T) => void, cancel: () => void) => void;
export type BossFormLoad<T> = (context: IFormLoadContext<T>, load: () => void) => void;
export abstract class BossFormLoadHandler<T> {
  public abstract load(context: IFormLoadContext<T>, load: () => void);
}
export interface IFormSubmitContext<T> {
  datasource: IHttpDataSource<T>
  form: BossFormBase<T>
  value: T
}
export interface IFormLoadContext<T> {
  datasource: IHttpDataSource<T>
  form: BossFormBase<T>
}

@Injectable()
export class BossFormBase<T> extends BossAutoForm {
  public datasource: IHttpDataSource<T>;
  public model: T;
  public modelChanged = new ReplaySubject<T>();
  public modelSaved = new Subject();
  public modelSaveCanceled = new Subject();
  public routeDataChanged = new ReplaySubject(1);
  public modelConstructor: constructorof<T>;
  public properties = {};
  public isReadonly = false;
  public key: any;
  public cloneKey: any;
  public get valid() {
    if (!this.formGroup) {
      return false;
    }
    return this.formGroup.valid;
  }
  public get keyOrCloneKey() { return this.key || this.cloneKey; }
  public get isCreateNew() {
    return this.key === undefined || this.key === null;
  }
  public get isClone() {
    return this.cloneKey !== undefined && this.cloneKey !== null;
  }
  public get isEdit() {
    return this.key !== undefined && this.key !== null;
  }
  public defaultSubmit: BossFormSubmit<T>[] = [(ctx, submit, cancel) => submit(ctx.value)];
  public defualtLoad: BossFormLoad<T>[] = [(ctx, load) => load()];

  protected submitHandler: Lazy<BossFormSubmit<T>>;
  protected loadHandler: Lazy<BossFormLoad<T>>;
  public valueTransformer: (model: T) => T = v => v;
  protected loadModel(model$: Observable<T>, next?: () => void) {
    const sub$ = model$.subscribe(m => {
      Promise.resolve().then(() => {
        m[this.datasource.identityProperty] = this.key;
        this.model = m;
        this.modelChanged.next(m);
        this.formGroup.reset(m);
        if (next) {
          next();
        }
      })
    }, null, () => { if (sub$) { sub$.unsubscribe(); } })
  }

  public save() {
    this.markAsTouched(this.formGroup);
    // TODO markAsPending not working(ng bug).. arrond with setTimeout, fix it after ng updated
    setTimeout(() => {
      this.formGroup.updateValueAndValidity({ onlySelf: false });
      if (this.valid) {
        const formModel = this.modelConstructor as any as IBossFormModel<any>;
        this.submitHandler.value({ datasource: this.datasource, form: this, value: this.valueTransformer(this.formGroup.getRawValue()) }, (value) => {
          this.loadModel(this.key ?
            this.datasource.update(this.key, value)
            : this.datasource.create(value)
            , () => {
              this.modelSaved.next();
            });
        }, () => {
          this.modelSaveCanceled.next();
        });
      }
    })
  }
  protected getDefault(): T {
    return new this.modelConstructor();
  }
  public load() {
    const formModel = this.modelConstructor as any as IBossFormModel<any>;
    if (formModel) {
      this.loadHandler.value({
        datasource: this.datasource,
        form: this
      }, () => {
        this.route.params.subscribe(params => {
          this.key = params['id'];
          this.route.queryParams.subscribe(queryParams => {
            if (!this.isReadonly) {
              this.formGroupHelper.setStatusFromQueryParams(this.formGroup, queryParams)
            }
            let id = params['id'];
            if ('$clone' in queryParams) {
              id = queryParams['$clone'];
              this.cloneKey = id;
            }
            this.loadModel(id ? this.datasource.get(id) : Observable.of(Object.assign(this.getDefault(), this.formGroupHelper.extractModelFromQueryParams(this.formGroup, queryParams))));
          })

        });
      });
    } else {
      console.error('must call buildModelType or buildModelFormRoute first.');
    }
  }
  public reset() {
    this.formGroup.reset(this.model);
    this.modelChanged.next(this.model);
  }
  public buildModelFormRoute() {
    this.route.data.subscribe(data => {
      this.buildModelType(data['modelType']);
    });
  }
  public buildModelType(constructor: constructorof<T>) {
    this.modelConstructor = constructor;
    if (this.modelConstructor) {
      this.datasource = this.factory.getDataSource(this.modelConstructor);
    }
  }
  public checkReadyOnly() {
    this.route.data.subscribe(data => {
      if (data['readonly']) {
        this.isReadonly = true;
        this.formGroup.disable({ onlySelf: false });
      } else {
        this.isReadonly = false;
        this.formGroup.enable({ onlySelf: false });
      }
    })
  }
  public init(formGroup: FormGroup, submitHandlers?: ValueOrArray<BossFormSubmit<T>>, loadHandlers?: ValueOrArray<BossFormLoad<T>>) {
    this.submitHandler = new Lazy(() => this.defaultSubmit.concat(new ValueOrArrayResolver(submitHandlers).array).reverse().reduce((p, c) => {
      return (context, submit, cancel) => c(context, () => p(context, submit, cancel), cancel);
    }));
    this.loadHandler = new Lazy(() => this.defualtLoad.concat(new ValueOrArrayResolver(loadHandlers).array).reverse().reduce((p, c) => {
      return (context, submit) => c(context, () => p(context, submit));
    }));
    this.formGroup = formGroup;
    this.checkReadyOnly();
    this.load();
  }
  public enableBackWhenSaved() {
    this.modelSaved.subscribe(() => {
      this.route.queryParams.subscribe(params => {
        const p = Object.assign({}, params);
        delete p['$clone'];
        this.router.navigate(['../'], { relativeTo: this.route, queryParams: p })
      })
    });
  }
  protected markAsTouched(group: FormGroup | FormArray) {
    for (const i in group.controls) {
      if (group.controls[i] instanceof FormControl) {
        group.controls[i].markAsTouched();
        (group.controls[i] as AbstractControl).updateValueAndValidity({ emitEvent: true, onlySelf: true });
      } else {
        this.markAsTouched(group.controls[i]);
      }
    }
  }
  constructor(protected route: ActivatedRoute, protected router: Router, protected factory: DataSourceFactory, protected actionButton: ActionButton,
    protected injector: Injector, protected formGroupHelper: FormGroupHelper, protected controlMetadata: ControlMetadata) {
    super();
    route.data.subscribe(data => {
      this.routeDataChanged.next(data);
    });

  }
}
