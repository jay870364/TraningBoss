import { PlatformProvider } from './../../PlatformProvider';
import { Component, OnInit, Input, AfterViewInit, AfterContentInit, ViewChild, ElementRef, Injector } from '@angular/core';
import { BossAutoFormControl } from './BossAutoFormControl';
import { IBossControlOption } from './IBossControlOption';
import { Observable } from 'rxjs/Observable';
import { DataSourceFactory } from '../../services/datasource/DataSourceFactory';
import { IBossOptionProvider } from '@boss/bosscontrol/services/IBossOptionProvider';
@Component({
  selector: 'boss-dropdownlist',
  templateUrl: './boss-dropdownlist.component.html',
  styleUrls: ['./boss-dropdownlist.component.scss']
})
export class BossDropdownlistComponent extends BossAutoFormControl {

  @Input() optionsI18nNamespace: string;
  @Input() noValueText: string;
  @Input() hint: string;
  _options: IBossControlOption[];
  _optionsProvider: IBossOptionProvider;
  @Input() public set options(value: IBossControlOption[] | IBossOptionProvider | PlatformProvider<IBossOptionProvider>) {
    if (value instanceof Array) {
      this._options = value.map(x => Object.assign({}, x));
      if (this.noValueText !== undefined) {
        this._options.unshift({ value: undefined, text: this.noValueText });
      }
    } else {
      if (PlatformProvider.isProvider(value)) {
        this._optionsProvider = value.get(this.injector);
      } else {
        this._optionsProvider = value;
      }
    }
    if (this._optionsProvider) {
      this.subs.push(this._optionsProvider.options.subscribe(x => {
        this._options = x;
        if (this.noValueText !== undefined) {
          this._options.unshift({ value: undefined, text: this.noValueText });
        }
      }));
    }
  }
  public get options() { return this._options; }
  constructor(protected dsf: DataSourceFactory, protected injector: Injector) {
    super();
  }
}
