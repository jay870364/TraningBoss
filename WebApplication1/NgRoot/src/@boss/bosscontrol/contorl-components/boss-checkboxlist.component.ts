import { PlatformProvider } from './../../PlatformProvider';
import { Component, OnInit, Input, AfterViewInit, OnDestroy, SimpleChanges, OnChanges, Injector } from '@angular/core';
import { BossAutoFormControl } from './BossAutoFormControl';
import { IBossControlOption } from './IBossControlOption';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { DataSourceFactory } from '@boss/services/datasource/DataSourceFactory';
import { IBossOptionProvider } from '@boss/bosscontrol/services/IBossOptionProvider';
@Component({
  selector: 'boss-checkboxlist',
  templateUrl: './boss-checkboxlist.component.html',
  styleUrls: ['./boss-checkboxlist.component.scss']
})
export class BossCheckboxlistComponent extends BossAutoFormControl implements OnInit, OnDestroy {


  @Input() sum = false;
  @Input() optionsI18nNamespace: string;
  @Input() showHeader = true;

  public innerGroup: FormArray = new FormArray([]);
  _options: IBossControlOption[];
  _optionsProvider: IBossOptionProvider;
  @Input() public set options(value: IBossControlOption[] | IBossOptionProvider | PlatformProvider<IBossOptionProvider>) {
    if (value instanceof Array) {
      this.setControls(value);
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
        this.setControls(x);
        this._options = x;
      }));
    }
  }
  protected valueWatcher: Subscription;
  protected setControls(options: IBossControlOption[]) {
    if (this.valueWatcher) {
      this.valueWatcher.unsubscribe();
      this.valueWatcher = null;
    }
    let value;
    if (this.control) {
      value = this.control.value;
    }
    if (value === undefined || value == null) {
      value = this.sum ? 0 : [];
    }
    while (this.innerGroup.controls.length) {
      this.innerGroup.removeAt(0);
    }
    options.forEach(o => this.innerGroup.push(new FormGroup({
      OptionValue: new FormControl(o.value),
      // tslint:disable-next-line:no-bitwise
      Checked: new FormControl(this.sum ? ((o.value & value) > 0) : (value.indexOf(o.value) >= 0))
    })));
    if (this.control) {
      if (this.control.status === 'DISABLED') {
        this.innerGroup.disable();
      } else {
        this.innerGroup.enable();
      }
    }
    this.valueWatcher = this.innerGroup.valueChanges.subscribe(v => {
      if (this.control) {
        const newValue = this.getCurrentValue();
        if (JSON.stringify(this.control.value) !== JSON.stringify(newValue)) {
          this.control.setValue(newValue);
        }
      }
    });
  }

  protected getCurrentValue(): number | any[] {
    const v: any[] = this.innerGroup.getRawValue();
    let nextValue: any;
    if (this.sum) {
      nextValue = v.filter(x => x.Checked).map(x => x.OptionValue).reduce((p, c) => p + c, 0);
    } else {
      nextValue = v.filter(x => x.Checked).map(x => x.OptionValue);
    }
    return nextValue;
  }
  constructor(protected dsf: DataSourceFactory, protected injector: Injector) {
    super();

  }
  ngOnInit(): void {
    super.ngOnInit();
    this.subs.push(this.control.valueChanges.subscribe(value => {
      if (value === undefined || value == null) {
        value = this.sum ? 0 : [];
      }
      if (JSON.stringify(value) !== JSON.stringify(this.getCurrentValue())) {
        if (this.sum) {
          const num = typeof value === 'number' ? value : parseFloat(value);
          this.innerGroup.controls.forEach((c, i) => {
            // tslint:disable-next-line:no-bitwise
            c.get('Checked').setValue((c.value.OptionValue & num) > 0);
          })
        } else if (value && value instanceof Array) {
          this.innerGroup.controls.forEach((c, i) => {
            c.get('Checked').setValue(value.indexOf(c.value.OptionValue) >= 0);
          })
        }
      }
    }));
    this.subs.push(this.control.statusChanges.subscribe(c => {
      if (c === 'DISABLED' && !this.innerGroup.disabled) {
        this.innerGroup.disable({ onlySelf: false });
      } else if (c !== 'DISABLED' && this.innerGroup.disabled) {
        this.innerGroup.enable({ onlySelf: false });
      }
    }))
  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
