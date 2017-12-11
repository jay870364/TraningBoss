import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, HostBinding, OnDestroy, AfterViewInit, AfterContentInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { DataSourceFactory } from '../../services/datasource/DataSourceFactory';
import { IHttpDataSource } from '../../services/datasource/IHttpDataSource';
import { BossEditForm } from '../services/form/BossEditForm';
import { IBossFormModel } from '@boss/decorator/form/BossFormModel';
import { BossFormBase } from '../services/form/BossFormBase';
import { BossAutoForm } from '../services/form/BossAutoForm';
import { UserRole } from '../../platform/services/UserRole';

@Component({
  selector: 'boss-auto-form',
  templateUrl: './boss-auto-form.component.html',
  styleUrls: ['./boss-auto-form.component.scss'],
  providers: [UserRole, BossEditForm, { provide: BossFormBase, useExisting: BossEditForm }, { provide: BossAutoForm, useExisting: BossEditForm }]
})
export class BossAutoFormComponent {
  @HostBinding('class.readonly') formReadonly = false;
  public reset() {
    this.form.formGroup.reset(this.form.model);
  }


  constructor(public form: BossEditForm<any>, router: Router, route: ActivatedRoute) {
    form.enableBackWhenSaved();
    route.data.subscribe(data => {
      form.buildModelType(data['modelType']);
    });

  }
}
