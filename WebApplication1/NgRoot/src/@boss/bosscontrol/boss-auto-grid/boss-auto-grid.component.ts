import { PlatformProvider } from './../../PlatformProvider';
import { UserRole } from '@boss/platform/services/UserRole';
import { CustomButtons } from './../../platform/services/CustomButtons';
import { Identity } from './../../services/Identity';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit, ChangeDetectorRef, ComponentFactoryResolver, Injector, Input
  , OnChanges, SimpleChanges, Optional, Provider, Host, Output, EventEmitter
} from '@angular/core';
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
import { BossGridComponent, BossGridSort } from '../boss-grid/boss-grid.component';
import { BossConfirmComponent } from '../dialogs/boss-confirm.component';
import { BossDialog } from '../services/bossDialog';
import { BossFilterForm } from '../services/form/BossFilterForm';
import { BossAutoForm } from '../services/form/BossAutoForm';
import { IBossActionButton } from '../../decorator/IBossActionButton';
import { BossAutoListComponent } from '../boss-auto-list/boss-auto-list.component';
import { ActionButton } from '../services/ActionButton';
import { ListLoaderFactory } from '../services/ListLoader';
import { BossFormBase } from '../services/form/BossFormBase';
import { BossListMetadataHelper } from '../services/BossListMetadataHelper';
import { BossAutoGridEdit } from '../services/BossAutoGridEdit';
import { BehaviorSubject } from 'rxjs/Rx';

@Component({
  selector: 'boss-auto-grid',
  templateUrl: './boss-auto-grid.component.html',
  styleUrls: ['./boss-auto-grid.component.scss'],
  providers: [BossFilterForm, BossAutoGridEdit, {
    provide: BossAutoForm,
    useExisting: BossFilterForm
  }]
})
export class BossAutoGridComponent implements AfterViewInit {
  @Input() editmode = false;
  protected _edit = false;
  @Output() editSaved = new EventEmitter();
  @Input() get edit() { return this._edit; }
  set edit(value: boolean) {
    this.grid.fieldComponents.forEach(f => f.setFieldStatus('editing', value));
    this._edit = value;
  }
  @Input() autoLoad = true;
  public listMetadata: IBossListMetadata[];
  public datasource: IHttpDataSource<any>;
  @Input() public actions: PlatformProvider<IBossActionButton<any>>[] = [];
  public i18nNamespace = 'Model';
  @Input() public showCreate = true;
  public fields;
  public fieldsReady = new BehaviorSubject<boolean>(false);
  @Input() scrolling = true;
  @Input() sortStatus: BossGridSort[];
  @ViewChild('grid') grid: BossGridComponent;
  @ViewChild('fieldsAnchor', { read: ViewContainerRef }) protected fieldsAnchor: ViewContainerRef;
  @Input() public modelType: constructorof<any>;
  protected initGrid() {
    if (this.modelType) {
      if (this.editmode) {
        this.autoGridEdit.init(this.grid, this.modelType);
      }
      (this.filterForm as BossFilterForm<any>).init(this.modelType);
      this.grid.classAutoHeight = true;
      const model = this.modelType as any as IBossListModel<any>;
      const settings = model.bossListSettings || {};
      const listMeta = model.bossListMetadata || {};
      if (settings.defaultSortState) {
        this.grid.sortStatus = settings.defaultSortState.map(x => Object.assign({}, x));
      }
      this.i18nNamespace = (model as any as II18nModel).defaultNamesapce || 'Model';
      this.listMetadata = Object.keys(listMeta).map(k => model.bossListMetadata[k]);
      const injector = Injector.create([{ provide: BossGridComponent, useValue: this.grid }, { provide: BossAutoGridComponent, useValue: this }], this.injector);
      const fields = [];
      fields.push(this.fieldsAnchor.createComponent(this.resolver.resolveComponentFactory(BossGridSerialFieldComponent), 0, injector).instance);
      this.listMetadata.sort((a, b) => (a.order || 0) - (b.order || 0)).forEach(metadata => {
        const cmpRef = this.fieldsAnchor.createComponent(this.resolver.resolveComponentFactory(metadata.component || BossGridFieldComponent), 0, injector);
        const componentInst = cmpRef.instance as BossGridFieldComponent;
        Object.assign(componentInst, metadata.componentData || {});
        componentInst.field = metadata.field;
        componentInst.header = metadata.header || componentInst.field;
        fields.push(componentInst);
      })
      const actionProviders = (model.bossListActions || []).concat(this.actions);
      const actions = this.actionButton.createButtons(actionProviders, this.injector);
      if (actions.length) {
        const actionCmpRef = this.fieldsAnchor.createComponent(this.resolver.resolveComponentFactory(BossGridActionFieldComponent), 0, injector);
        const actionFieldCmp = actionCmpRef.instance as BossGridActionFieldComponent;
        actionFieldCmp.actions = actions;
        if (this.identity.isLogined && this.userRole) {
          const btns = this.customButtons.getButton(this.identity.identity.SystemCode, this.userRole.functionName);
          if (btns && btns.length) {
            actionFieldCmp.actions = actionFieldCmp.actions.concat(btns);
          }
        }
        actionFieldCmp.cellStyle = { 'flex-shrink': 0 };
        fields.push(actionFieldCmp);
      }

      fields.forEach((f: BossGridFieldComponent) => {
        if (!f.i18nNamespace) {
          f.i18nNamespace = this.i18nNamespace;
        }
        this.grid.addExtension(f);
      });
      const select = this.listMetaHelper.getSelectProperties(this.modelType).join(',');
      this.fields = fields;
      this.fieldsReady.next(true);
      const ds = this.datasourceFac.getDataSource(<constructorof<any>><any>this.modelType);
      const loader = this.listLoader.createLoader(settings.loader, injector);
      loader.loader(ds, (datasource) => this.datasource = datasource);
      if (settings.autoSelect !== false) {
        this.grid.useQuery((datasource, query) => {
          query(datasource.select(select))
        });
      }
      this.cdr.detectChanges();
      if (this.autoLoad) {
        setTimeout(() => this.grid.load(true));
      }
    }
  }
  ngAfterViewInit(): void {
    this.initGrid();
  }
  public editRows() {
    this.edit = true;
    this.autoGridEdit.formArray.reset(this.grid.data);
  }
  public saveRows() {
    this.autoGridEdit.save().then(() => {
      this.edit = false;
      this.grid.refresh();
      this.editSaved.emit();
    });
  }
  constructor( @Optional() protected userRole: UserRole, protected customButtons: CustomButtons, protected identity: Identity, protected autoGridEdit: BossAutoGridEdit,
    protected datasourceFac: DataSourceFactory, private sanitized: DomSanitizer,
    private cdr: ChangeDetectorRef, protected listMetaHelper: BossListMetadataHelper,
    private resolver: ComponentFactoryResolver, protected injector: Injector, protected filterForm: BossAutoForm, protected actionButton: ActionButton, protected listLoader: ListLoaderFactory) {

  }
}
