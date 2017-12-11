import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { BossAutoFormControl } from './BossAutoFormControl';
import { IBossControlOption } from './IBossControlOption';
import { Observable } from 'rxjs/Observable';
import { DataSourceFactory } from '@boss/services/datasource/DataSourceFactory';
@Component({
  selector: 'boss-radiolist',
  templateUrl: './boss-radiolist.component.html',
  styleUrls: ['./boss-radiolist.component.scss']
})
export class BossRadiolistComponent extends BossAutoFormControl {

  @Input() optionsI18nNamespace: string;
  @Input() options: IBossControlOption[];
  @Input() showHeader = true;
  @Input() set optionsModelType(type: constructorof<any>) {
    this.optionsObservable = this.dsf.getDataSource(type).toSubject().map(x => [{ text: '', value: undefined }].concat(x.data.map(y => { return { text: this.optionsTextGetter(y), value: this.optionsValueGetter(y) }; })));
  }
  @Input() optionsTextGetter: (model: any) => any;
  @Input() optionsValueGetter: (model: any) => any;
  public optionsObservable: Observable<IBossControlOption[]>
  constructor(protected dsf: DataSourceFactory) {
    super();
  }
}
