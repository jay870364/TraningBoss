import { BossGridComponent } from './boss-grid.component';

import { Component, forwardRef, Input, ViewChild, Inject, Host, Optional, ContentChild, AfterContentInit, AfterViewInit, ContentChildren, QueryList, Injector } from '@angular/core';
import { BossGridExtensionComponent } from './boss-grid-extension.component';
import { NgForm, FormGroup, NgModel } from '@angular/forms';
import { BossGridFilterOperatorDirective } from './boss-grid-filter-operator.directive';
import { IFilterOperator } from '@boss/services/datasource/IDatasourceFilter';
import { ExtensionData } from './services/ExtensionData';
import { BossGridCustomFilterDirective } from './boss-grid-custom-filter.directive';
import { Identity } from '../../services/Identity';
export class BossGridFilterData {
  public operators: BossGridFilterOperatorDirective[] = [];
  public customFilters: BossGridCustomFilterDirective[] = [];
}
@Component({
  selector: 'boss-grid-filter',
  templateUrl: './boss-grid-filter.component.html',
  styleUrls: ['./boss-grid-filter.component.scss'],
  providers: [BossGridFilterData]
})
export class BossGridFilterComponent extends BossGridExtensionComponent implements AfterViewInit {
  @ContentChildren(NgModel, { descendants: true }) public models: QueryList<NgModel>;
  @ViewChild(NgForm) form: NgForm;
  constructor(
    identity: Identity,
    @Inject(forwardRef(() => BossGridComponent))
    @Host()
    @Optional()
    public grid: BossGridComponent,
    @Inject(ExtensionData)
    @Host()
    @Optional()
    public extensionData: ExtensionData,
    @Inject(BossGridFilterData)
    @Host() protected filterFormData: BossGridFilterData,
    @Inject(Injector) injector: Injector
  ) {
    super(identity, grid, extensionData, injector);

  }
  ngAfterViewInit() {
    const ngContentModels = this.models.toArray();
    ngContentModels.forEach((model) => {
      this.form.addControl(model);
    });
  }
  query() {
    this.reload(true)
  }
  onSetup() {
    this.grid.useQuery((ds, query) => {
      const form = this.form;
      const directiveMap: { [key: string]: { operator?: BossGridFilterOperatorDirective, customFilter?: BossGridCustomFilterDirective } } = {};
      for (const op of this.filterFormData.operators) {
        if (op.name) {
          if (!directiveMap[op.name]) {
            directiveMap[op.name] = {};
          }
          directiveMap[op.name].operator = op;
        }
      }
      for (const filter of this.filterFormData.customFilters) {
        if (filter.name) {
          if (!directiveMap[filter.name]) {
            directiveMap[filter.name] = {};
          }
          directiveMap[filter.name].customFilter = filter;
        }
      }
      if (form.value && form.valid) {
        for (const key of Object.keys(form.value)) {
          const value = form.value[key];
          if (value !== undefined) {
            if (directiveMap[key] && directiveMap[key].customFilter) {
              if (directiveMap[key].customFilter.filter) {
                ds = directiveMap[key].customFilter.filter(ds, value);
              }
            } else {
              const operator = <IFilterOperator>((directiveMap[key] && directiveMap[key].operator) ? directiveMap[key].operator.operator : ((typeof value === 'string') ? 'contains' : '='));
              ds = ds.where(key, operator, value);
            }
          }
        }
      }
      query(ds);
    });
  }
}

