
import { Component, ContentChildren, QueryList, Input, forwardRef, TemplateRef, ViewChild, ContentChild, Inject, ChangeDetectorRef, HostBinding, Host, Optional, Injector } from '@angular/core';
import { BossGridComponent } from './boss-grid.component';
import { DataSourceResponse } from '../../services/datasource/DataSourceResponse';
import { Observable } from 'rxjs/Observable';
import { ExtensionData } from './services/ExtensionData';
import { Identity } from '@boss/services/Identity';


export abstract class BossGridExtensionComponent {
  @Input() public i18nNamespace: string;
  @Input() public ready = false;
  protected injector: Injector;
  constructor( @Inject(Identity) public identity: Identity,
    @Inject(forwardRef(() => BossGridComponent))
    @Host() @Optional() public grid: BossGridComponent,
    @Inject(ExtensionData) @Host() @Optional() public extensionData: ExtensionData, @Inject(Injector) injector: Injector) {
    this.injector = Injector.create([
      { provide: BossGridComponent, useValue: this.grid },
      { provide: ExtensionData, useValue: extensionData }], injector);
    this.onCreate();
    if (grid) {
      this.grid.addExtension(this);
    }
  }
  public onCreate() { }
  public setup() {
    if (!this.ready) {
      this.onSetup();
      this.ready = true;
    }
  }
  protected onSetup() { }
  public refresh() {
    if (this.ready) {
      this.grid.refresh();
    }
  }
  public reload(initState?: boolean) {
    if (this.ready) {
      this.grid.load(initState);
    }
  }
}
