import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, HostBinding, OnDestroy, AfterViewInit, AfterContentInit, Input, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { DataSourceFactory } from '../../services/datasource/DataSourceFactory';
import { IHttpDataSource } from '../../services/datasource/IHttpDataSource';
import { BossAutoForm } from '../services/form/BossAutoForm';
import { BossEditForm } from '../services/form/BossEditForm';
import { BossFormBase } from '../services/form/BossFormBase';
import { UserRole } from '@boss/platform/services/UserRole';

@Component({
  selector: 'boss-default-actions',
  templateUrl: './boss-default-actions.component.html'
})
export class BossDefaultActionsComponent {
  constructor(public form: BossFormBase<any>, protected route: ActivatedRoute, protected router: Router, public userRole: UserRole) {

  }
  public backList() {
    this.route.queryParams.subscribe(params => {
      const p = Object.assign({}, params);
      delete p['$clone'];
      const parts = ['../'];
      if (this.form.isReadonly) {
        parts[0] = '../../';
      }
      this.router.navigate(parts, { relativeTo: this.route, queryParams: p })
    })
  }
}
