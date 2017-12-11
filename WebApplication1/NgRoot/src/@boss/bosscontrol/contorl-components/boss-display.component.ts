import { PlatformProvider } from './../../PlatformProvider';
import { Component, OnInit, Input, OnChanges, SimpleChanges, Injector } from '@angular/core';
import { BossAutoFormControl } from './BossAutoFormControl';
export interface IDisplayHandler {
  formatter: (rawValue, apply: (value) => void) => void;
}
@Component({
  selector: 'boss-display',
  templateUrl: './boss-display.component.html',
  styleUrls: ['./boss-display.component.scss']
})
export class BossDisplayComponent extends BossAutoFormControl implements OnInit, OnChanges {
  @Input() public hint: string;
  public displayValue: string;
  @Input() public displayHandlerType: PlatformProvider<IDisplayHandler>;
  public displayHandler: IDisplayHandler;
  @Input() public formatter: (rawValue, apply: (value) => void) => void = (rawValue, apply) => apply(rawValue);

  constructor(protected injector: Injector) {
    super();
  }
  ngOnInit() {
    super.ngOnInit();
    this.subs.push(this.control.valueChanges.subscribe(rawValue => this.formatter(rawValue, value => this.displayValue = value)));
    if (this.displayHandlerType) {
      this.buildFormatter(this.displayHandlerType);
    }
  }
  protected buildFormatter(type: PlatformProvider<IDisplayHandler>) {
    this.displayHandler = type.get(this.injector);
    this.formatter = (rawValue, apply) => this.displayHandler.formatter(rawValue, apply);
  }
  ngOnChanges(changes: SimpleChanges) {
    if ('displayHandlerType' in changes) {
      this.buildFormatter(changes['displayHandlerType'].currentValue);
    }
  }
}
