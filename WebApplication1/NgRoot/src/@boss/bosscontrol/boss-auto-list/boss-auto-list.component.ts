import { PlatformProvider } from '@boss/PlatformProvider';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit, ChangeDetectorRef, ComponentFactoryResolver, Injector, AfterContentInit, Injectable } from '@angular/core';
import { IDataSource } from '../../services/datasource/IDataSource';
import { IBossListMetadata, IBossListModel } from '../../decorator/list/BossListModel';
import { IBossApiModel } from '@boss/decorator/BossApiModel';
import { IBossListSettings, IBossAutoListLoadContext } from '../services/list/BossAutoList';
import { Lazy } from '../../Lazy';
import { DataSourceFactory } from '../../services/datasource/DataSourceFactory';
import { IHttpDataSource } from '@boss/services/datasource/IHttpDataSource';
import { II18nModel } from '../../decorator/i18n/i18nNs';
import { DomSanitizer } from '@angular/platform-browser';
import { BossGridFieldComponent } from '../boss-grid/boss-grid-field.component';
import { BossGridSerialFieldComponent } from '../boss-grid/boss-grid-serial-field.component';
import { BossGridActionFieldComponent } from '../boss-grid/boss-grid-action-field.component';
import { BossGridComponent } from '../boss-grid/boss-grid.component';
import { BossConfirmComponent } from '../dialogs/boss-confirm.component';
import { BossDialog } from '../services/bossDialog';
import { BossAutoGridComponent } from '../boss-auto-grid/boss-auto-grid.component';
import { IBossActionButton } from '../../decorator/IBossActionButton';
import { BossGridExtensionComponent } from '../boss-grid/boss-grid-extension.component';
import { ListDeleterFactory } from '@boss/bosscontrol/services/ListDeleter';
import { IListDeleter } from '../services/ListDeleter';
import { UserRole } from '../../platform/services/UserRole';


export class EditButton implements IBossActionButton<any> {
  text = 'BossControl.修改';
  get visible() {
    return this.userRole.hasRole('Modify');
  }
  enabled = true;
  constructor(protected route: ActivatedRoute, protected router: Router, protected userRole: UserRole) {

  }
  click($event, entry, key) {
    this.router.navigate([key], { relativeTo: this.route, queryParamsHandling: 'merge' });
  }
}

export class CloneButton implements IBossActionButton<any> {
  text = 'BossControl.複製';
  get visible() {
    return this.userRole.hasRole('Create');
  }
  enabled = true;
  constructor(protected route: ActivatedRoute, protected router: Router, protected userRole: UserRole) {

  }
  click($event, entry, key) {
    this.router.navigate(['createnew'], { queryParams: { $clone: key }, relativeTo: this.route, queryParamsHandling: 'merge' });
  }
}

export class DeleteButton implements IBossActionButton<any> {
  text = 'BossControl.刪除';
  get visible() {
    return this.userRole.hasRole('Delete');
  }
  enabled = true;
  color = 'warn';
  constructor(protected userRole: UserRole, protected list: BossAutoListComponent) {

  }
  click($event, entry, key) {
    this.list.deleteFromList(entry);
  }
}

@Component({
  selector: 'boss-auto-list',
  templateUrl: './boss-auto-list.component.html',
  styleUrls: ['./boss-auto-list.component.scss'],
  providers: [UserRole]
})
export class BossAutoListComponent implements AfterViewInit, AfterContentInit {
  public actions = [new PlatformProvider(EditButton, [ActivatedRoute, Router, UserRole]), new PlatformProvider(CloneButton, [ActivatedRoute, Router, UserRole]), new PlatformProvider({
    provide: DeleteButton,
    useFactory: (userRole) => new DeleteButton(userRole, this),
    deps: [UserRole]
  })];
  public deleter: IListDeleter<any>;
  public modelType: any;
  @ViewChild('autoGrid') protected autoGrid: BossAutoGridComponent;
  constructor(public userRole: UserRole, protected route: ActivatedRoute, protected router: Router, protected deletefac: ListDeleterFactory, protected injector: Injector) {

  }
  ngAfterViewInit() {

  }
  ngAfterContentInit() {
    this.route.data.subscribe(d => {
      if (d['modelType']) {
        const modelType = d['modelType'] as IBossListModel<any>;
        if ((modelType.bossListSettings || {}).defaultActions === false) {
          this.actions = [];
        }
        this.modelType = modelType;
        this.deleter = this.deletefac.createLoader((modelType.bossListSettings || {} as any).deleter, this.injector);
      } else {
        throw Error('route data not include modelType');
      }
    });
  }
  public deleteFromList(model: any) {
    this.deleteModel(model, () => {
      this.autoGrid.grid.load(true);
    }, () => { })
  }
  public deleteModel(model: any, success, cancel) {
    if (this.deleter) {
      this.deleter.delete(model, model[this.autoGrid.datasource.identityProperty], this.autoGrid.datasource, success, cancel);
    }

  }
}
