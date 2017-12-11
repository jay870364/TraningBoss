import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef } from '@angular/core';
import { BossAutoFormControl } from './BossAutoFormControl';
import { DataSourceFactory } from '../../services/datasource/DataSourceFactory';
import { IHttpDataSource } from '../../services/datasource/IHttpDataSource';
import { BossDialog } from '../services/bossDialog';
import { NgModel, FormControl, AbstractControl } from '@angular/forms';
import { IBossListModel } from '../../decorator/list/BossListModel';
import { BossListMetadataHelper } from '@boss/bosscontrol/services/BossListMetadataHelper';
@Component({
  selector: 'boss-reference',
  templateUrl: './boss-reference.component.html',
  styleUrls: ['./boss-reference.component.scss']
})
export class BossReferenceComponent extends BossAutoFormControl implements OnInit {
  @Input() public modelType: constructorof<any>;
  @ViewChild('model') model: NgModel;
  public value: any;
  public displayText: string;
  public get control(): AbstractControl { return this.group.controls[this.controlName]; };
  @Input() public field: string;
  @Input() public displayFormatter: (model, property) => string;
  constructor(protected apiFactory: DataSourceFactory, protected dialog: BossDialog, protected viewContainerRef: ViewContainerRef, protected listMetaHelper: BossListMetadataHelper) {
    super();

  }
  ngOnInit() {
    if (!this.control) {
      throw Error(`control ${this.controlName} not exisist`);
    }
    const control = this.control;
    this.getDisplay(control.value);
    const top = control.markAsTouched;
    control.markAsTouched = (opts) => {
      top.apply(control, [opts]);
      this.model.control.markAsTouched(opts);
    }
    control.valueChanges.subscribe(v => {
      this.getDisplay(v);
    });
    this.model.control.setValidators((ctrl) => !control.valid ? control.errors : null);
  }
  public openSelector() {
    this.dialog.referenceSelector('BossControl.SelectReference', this.modelType, key => {
      if (this.control.value !== key) {
        this.control.setValue(key);
        this.control.markAsTouched();
      }
    }, () => { }, this.viewContainerRef);
  }
  public getDisplay(value) {
    if (this.field || this.displayFormatter) {
      if (this.value !== value) {
        this.value = value;
        if (value !== undefined && value !== null) {
          const ds = this.apiFactory.getDataSource(this.modelType);
          ds.select(this.listMetaHelper.getSelectProperties(this.modelType).join(',')).where(ds.identityProperty, '=', value).toSubject().subscribe(ms => {
            const m = ms.data[0];
            if (m !== null && m !== undefined) {
              if (this.displayFormatter) {
                this.displayText = this.displayFormatter(m, this.field);
              } else {
                this.displayText = m[this.field];
              }
            } else {
              this.displayText = '';
              console.warn(`${value} not found in ${this.modelType.name}`);
            }
          });
        } else {
          this.displayText = '';
        }
      }
    } else {
      this.displayText = value;
    }
  }
}
