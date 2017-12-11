
import { Directive, Inject, Input, Host, ViewChild } from '@angular/core';
import { NgForm, NgControl, NgModel } from '@angular/forms';
import { IFilterOperator } from '../../services/datasource/IDatasourceFilter';
import { BossGridFilterData } from './boss-grid-filter.component';

@Directive({
  selector: '[bossGridFilterOperator]'
})
export class BossGridFilterOperatorDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('bossGridFilterOperator') public operator: IFilterOperator;
  @Input() public name: string;
  constructor( @Inject(BossGridFilterData) @Host() protected formData: BossGridFilterData) {
    formData.operators.push(this);

  }
}
