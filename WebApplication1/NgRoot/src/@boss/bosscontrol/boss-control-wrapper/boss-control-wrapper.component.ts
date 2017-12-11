

import {
  Component, Input, ViewChild,
  ComponentRef, ComponentFactory, ComponentFactoryResolver,
  ViewContainerRef, Injector, OnDestroy, OnChanges, OnInit,
  ChangeDetectorRef, AfterContentInit
} from '@angular/core';
import { BossAutoFormControl } from '../contorl-components/BossAutoFormControl';
import { FormGroup } from '@angular/forms';
import { IBossFormMetadata } from '../../decorator/form/IBossFormMetadata';
import { Optional, Inject } from '@angular/core';
import { BossFormBase } from '../services/form/BossFormBase';
import { BossAutoForm } from '../services/form/BossAutoForm';

@Component({
  selector: 'boss-control-wrapper',
  template: `<div #anchor class="anchor"></div>`,
  styleUrls: ['./boss-control-wrapper.component.scss']
})
export class BossControlWrapperComponent implements OnInit, OnChanges {

  @Input() metadata: IBossFormMetadata;
  @ViewChild('anchor', { read: ViewContainerRef }) anchor: ViewContainerRef;
  protected cmpRef: ComponentRef<any>;
  private isContentInitialized = false;
  constructor(private cdr: ChangeDetectorRef, private resolver: ComponentFactoryResolver, protected injector: Injector, protected form: BossAutoForm) {

  }


  ngOnInit(): void {
    this.updateComponent();
  }

  ngOnChanges() {
    // this.updateComponent();
  }
  updateComponent() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
    if (this.metadata) {
      this.cmpRef = this.anchor.createComponent(this.resolver.resolveComponentFactory(this.metadata.component), 0, this.injector);
      const componentInst = this.cmpRef.instance as BossAutoFormControl;
      Object.assign(componentInst, this.metadata.componentData || {});
      componentInst.controlName = this.metadata.field;
      componentInst.group = this.form.formGroup;
      componentInst.i18nNamespace = this.form.i18nNamespace;

      this.cdr.detectChanges();
    }
  }
}
