
import { Directive, Inject, Input, Host, ViewChild } from '@angular/core';
import { NgForm, NgControl, NgModel } from '@angular/forms';
import { IFilterOperator } from '../../services/datasource/IDatasourceFilter';
import { BossGridFilterData } from './boss-grid-filter.component';
import { IDataSource } from '../../services/datasource/IDataSource';

@Directive({
  selector: '[bossGridCustomFilter]'
})
export class BossGridCustomFilterDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('bossGridCustomFilter') public filter: (datasource: IDataSource<any>, value: any) => IDataSource<any>;
  @Input() public name: string;
  constructor( @Inject(BossGridFilterData) @Host() protected formData: BossGridFilterData) {
    formData.customFilters.push(this);

  }
}
