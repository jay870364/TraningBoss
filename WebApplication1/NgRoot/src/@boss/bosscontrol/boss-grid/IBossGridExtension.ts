import { BossGridComponent } from './boss-grid.component';
import { ExtensionData } from './services/ExtensionData';
import { TemplateRef, Pipe } from '@angular/core';
export interface IBossGridExtension {
  grid: BossGridComponent;
  extensionData: ExtensionData;
  ready: boolean;
  setup(): void;
}
export interface IBossGridField {
  field: string;
  cellTemplate: TemplateRef<any>;
  headerTemplate: TemplateRef<any>;
  header: string;
  ngStyle: any;
  cellStyle: any;
  headerStyle: any;
  linkToView: boolean;
  cellI18nNamesapce: string;
  cellPipe: Pipe;
  // --shotcut styles
  width: string;
  align: string;
  visible: boolean;
  sort: boolean;
}
