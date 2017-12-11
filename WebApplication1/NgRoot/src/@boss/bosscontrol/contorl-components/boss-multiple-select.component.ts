import { PlatformProvider } from './../../PlatformProvider';
import { Component, OnInit, Input, AfterViewInit, OnDestroy, SimpleChanges, OnChanges, Injector, ViewChild, HostListener, ElementRef, ChangeDetectorRef } from '@angular/core';
import { BossAutoFormControl } from './BossAutoFormControl';
import { IBossControlOption } from './IBossControlOption';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { DataSourceFactory } from '@boss/services/datasource/DataSourceFactory';
import { IBossOptionProvider } from '../services/IBossOptionProvider';
import { MatExpansionPanel, MatSelectionList, MatListOption } from '@angular/material';
@Component({
  selector: 'boss-multiple-select',
  templateUrl: './boss-multiple-select.component.html',
  styleUrls: ['./boss-multiple-select.component.scss']
})
export class BossMultipleSelectComponent extends BossAutoFormControl implements OnInit, AfterViewInit, OnDestroy {


  @Input() sum = false;
  @Input() optionsI18nNamespace: string;

  public filterStr = ''
  public get options() { return this._options; }
  @ViewChild(MatExpansionPanel) panel: MatExpansionPanel;
  public innerGroup: FormArray = new FormArray([]);
  public get selected() {
    return this.innerGroup.value.filter(x => x.checked);
  }
  protected subs: Subscription[] = [];
  _options: IBossControlOption[];
  _optionsProvider: IBossOptionProvider;
  @Input() public set options(value: IBossControlOption[] | IBossOptionProvider | PlatformProvider<IBossOptionProvider>) {
    if (value instanceof Array) {
      this.setControls(value, []);
      this._options = value.map(x => Object.assign({}, x));

    } else {
      if (PlatformProvider.isProvider(value)) {
        this._optionsProvider = value.get(this.injector);
      } else {
        this._optionsProvider = value;
      }
    }
    if (this._optionsProvider) {
      this.subs.push(this._optionsProvider.options.subscribe(x => {
        this.setControls(x, this.control.value || []);
        this._options = x;
      }));
    }
  }
  constructor(protected injector: Injector, protected eref: ElementRef, protected cdr: ChangeDetectorRef) {
    super();
    this.innerGroup.valueChanges.subscribe(value => {
      if (this.control) {
        let newValue = value.filter(x => x.checked).map(x => x.value);
        if (newValue.length === 0) {
          newValue = undefined;
        }
        if (JSON.stringify(this.control.value) !== JSON.stringify(newValue)) {
          this.control.setValue(newValue);
        }
      }
    })
  }
  protected setControls(options: IBossControlOption[], value: any[]) {
    while (this.innerGroup.controls.length) {
      this.innerGroup.removeAt(0);
    }
    options.forEach(o => this.innerGroup.push(new FormGroup({
      value: new FormControl(o.value),
      checked: new FormControl(value.indexOf(o.value) !== -1)
    })));
  }

  @HostListener('document:click', ['$event']) documentClick(e) {
    if (this.panel.expanded && !this.eref.nativeElement.contains(e.target)) {
      this.panel.close();
    }
  }
  ngAfterViewInit() {
  }
  protected setInnerValue(value: any[]) {
    this.innerGroup.controls.forEach(c => {
      const shouldValue = value.indexOf(c.value.value) !== -1;
      if (c.value.checked !== shouldValue) {
        c.get('checked').setValue(shouldValue);
      }
    })
  }
  ngOnInit(): void {
    super.ngOnInit();
    if (this.control) {
      this.subs.push(this.control.valueChanges.subscribe((value: any[]) => this.setInnerValue(value || [])));

    }
  }
  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }
}
