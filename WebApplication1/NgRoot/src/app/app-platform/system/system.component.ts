import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { PlatformSystem } from '../models/PlatformSystem';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { IHttpDataSource } from '@boss/services/datasource/IHttpDataSource';
import { Observable } from 'rxjs/Observable';
import { BossGridComponent } from '@boss/bosscontrol/boss-grid/boss-grid.component';
import { BossFormBase } from '@boss/bosscontrol/services/form/BossFormBase';
import { BossAutoForm } from '@boss/bosscontrol/services/form/BossAutoForm';
import { FunctionDetial } from '../models/FunctionDetail';
import { DataSourceFactory } from '@boss/services/datasource/DataSourceFactory';
import { SystemFunction } from '../models/SystemFunction';
import { Module } from '../models/Module';
import { Menu } from '../models/Menu';
import { UserRole } from '@boss/platform/services/UserRole';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
  providers: [UserRole, BossFormBase, { provide: BossAutoForm, useExisting: BossFormBase }]
})
export class SystemComponent implements OnInit {
  public formGroup: FormGroup;
  public functionDetailDatasource: IHttpDataSource<FunctionDetial>;
  public systemFunctionDatasource;
  @ViewChild('functionGrid') public functionGrid: BossGridComponent;
  public modules: Observable<string[]>;
  protected systemFunctions: SystemFunction[] = [];
  public menuModelType = Menu;
  constructor( @Inject(BossAutoForm) public form: BossFormBase<PlatformSystem>, protected dsFac: DataSourceFactory) {
    this.form.buildModelFormRoute();
    this.formGroup = new FormGroup({
      Name: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      Code: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      Status: new FormControl(),
      DefaultMenuId: new FormControl(),
      SystemFunctions: new FormArray([])
    });
    form.init(this.formGroup);
    form.modelChanged.subscribe(model => {
      if (form.keyOrCloneKey) {
        dsFac.getDataSource(SystemFunction).where('SystemId', '=', form.keyOrCloneKey).toSubject().subscribe(r => {
          this.systemFunctions = r.data;
          this.systemFunctions.forEach(sf => this.addFunctionControls(sf));
          this.systemFunctionDatasource = dsFac.getDataSource(this.systemFunctions);
        });
      } else {
        this.systemFunctions = [];
        this.systemFunctionDatasource = dsFac.getDataSource(this.systemFunctions);
      }
    });
    form.enableBackWhenSaved();

    this.functionDetailDatasource = dsFac.getDataSource(FunctionDetial);

    this.modules = dsFac.getDataSource(Module).toSubject().map(m => m.data.map(x => x.Module));

  }
  public addFunctionControls(sf: SystemFunction) {
    (this.formGroup.get('SystemFunctions') as FormArray).push(new FormGroup({
      Status: new FormControl(sf.Status),
      Id: new FormControl(this.form.isClone ? null : sf.Id),
      DeveloperName: new FormControl(sf.DeveloperName, Validators.required)
    }));
    if (this.form.isReadonly) {
      this.formGroup.disable();
    }
  }
  public checkFunctionExists(entry: FunctionDetial): boolean {
    return this.systemFunctions.filter(x => x.DeveloperName === entry.Id).length !== 0
  }
  public removeFunction(entry: SystemFunction, index: number) {
    (this.formGroup.get('SystemFunctions') as FormArray).removeAt(index);
    this.systemFunctions.splice(index, 1);
    this.functionGrid.load();
  }
  public addFunction(entry: FunctionDetial) {
    if (!this.checkFunctionExists(entry)) {
      const fun = new SystemFunction();
      fun.DeveloperName = entry.Id;
      this.systemFunctions.push(fun);
      this.addFunctionControls(fun);
      this.functionGrid.load(true);
    }
  }
  ngOnInit() {
  }

}
