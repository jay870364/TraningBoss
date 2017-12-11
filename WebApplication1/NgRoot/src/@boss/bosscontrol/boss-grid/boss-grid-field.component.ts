
import { Component, ContentChildren, QueryList, Input, forwardRef, TemplateRef, ViewChild, ContentChild, Pipe } from '@angular/core';
import { BossGridCellTemplateComponent } from './boss-grid-cell-template.component';
import { BossGridHeaderTemplateComponent } from './boss-grid-header-template.component';
import { BossGridExtensionComponent } from './boss-grid-extension.component';
import { IBossGridField } from '../../decorator/list/BossListModel';
import { BOSS_GRID_FILED } from './tokens';
import { ValueOrFactoryResolver } from '../../ValueOrFactory';
import { BehaviorSubject } from 'rxjs/Rx';

@Component({
  selector: 'boss-grid-field',
  templateUrl: './boss-grid-field.component.html',
  providers: [{ provide: BOSS_GRID_FILED, useExisting: forwardRef(() => BossGridFieldComponent) }]
})
export class BossGridFieldComponent extends BossGridExtensionComponent implements IBossGridField {
  @ViewChild('baseCellTemplate') public baseCellTemplate: TemplateRef<any>;
  @ViewChild('baseHeaderTemplate') public baseHeaderTemplate: TemplateRef<any>;
  @ContentChild(forwardRef(() => BossGridCellTemplateComponent)) public inlineTemplate: BossGridCellTemplateComponent;
  @ContentChild(forwardRef(() => BossGridHeaderTemplateComponent)) public inlineHeaderTemplate: BossGridHeaderTemplateComponent;
  public _fieldStatus = {};
  public fieldStatus = new BehaviorSubject<{ [key: string]: any }>({});
  @Input() public field: string;
  @Input() public cellTemplate: TemplateRef<any>;
  @Input() public headerTemplate: TemplateRef<any>;
  @Input() public header: string;
  @Input() public ngStyle: any;
  @Input() public ngClass: any;
  @Input() public cellStyle: any;
  @Input() public cellClass: any;
  @Input() public headerStyle: any;
  @Input() public linkToView = false;
  @Input() public linkTo: (entry, property, value) => string;
  @Input() public linkToTarget: string;
  @Input() public appendToken: boolean;
  @Input() public cellI18nNamesapce: string;
  @Input() public visible: boolean;
  @Input() public align: string;
  @Input() public verticalAlign: string;
  @Input() public sort = true;
  // --shotcut styles
  @Input() public width: string;
  @Input() public widthMode = 'max';
  @Input() public flex: number;
  // --
  @Input() public displayFormatter: (entry, property, value) => string = (e, p, v) => v;
  public setFieldStatus(key: string, value: any) {
    this._fieldStatus[key] = value;
    this.fieldStatus.next(this._fieldStatus);
  }
  public getEncodeToken() {
    if (this.identity.isLogined && this.identity.identity.Token) {
      return encodeURIComponent(this.identity.identity.Token) + '&acsid=' + this.identity.identity.AccountSystemId;
    }
    return '';
  }
  public getCellValue(entry: any, value: any) {
    let val = this.displayFormatter(entry, this.field, value);
    if (val && typeof val === 'string') {
      val = val.replace(/\r/g, '').replace(/\n/g, '<br/>');
    }
    return (val === undefined || val === null) ? '' : (this.cellI18nNamesapce ? `${this.cellI18nNamesapce}.${val}` : val);
  }
  public getHeader() {
    const header = this.header || this.field;
    return this.i18nNamespace ? `${this.i18nNamespace}.${header}` : header;
  }
  public get widthStyles() {
    if ((this.width !== undefined && this.width !== null) || (this.flex !== undefined && this.flex !== null)) {
      const style = {};
      if (this.width !== undefined && this.width !== null) {
        if (this.widthMode !== 'width') {
          style['max-width'] = this.width;
        }
      }
      if (this.flex !== undefined && this.flex !== null) {
        style['flex'] = this.flex;
      }
      return style;
    }
    return undefined;
  }
  public getCellClasses(value, entry) {
    const style = Object.assign({}, this.ngClass || {});
    return Object.assign(style, new ValueOrFactoryResolver(this.cellClass).getValue(value, entry) || {});
  }
  public getCellStyles(value, entry) {
    const style = Object.assign({}, this.ngStyle || {});
    return Object.assign(style, new ValueOrFactoryResolver(this.cellStyle).getValue(value, entry) || {});
  }
  public get headerStyles() {
    const style = Object.assign({}, this.ngStyle || {});
    return Object.assign(style, this.headerStyle || {});
  }
  public get finalHeaderTemplate(): TemplateRef<any> {
    if (this.inlineHeaderTemplate) {
      return this.inlineHeaderTemplate.template;
    }
    return this.headerTemplate || this.baseHeaderTemplate;
  }
  public get finalCellTemplate(): TemplateRef<any> {
    if (this.inlineTemplate) {
      return this.inlineTemplate.template;
    }
    return this.cellTemplate || this.baseCellTemplate;
  };
}
