import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
import { BossGridComponent } from './boss-grid/boss-grid.component';
import { BossGridFieldComponent } from './boss-grid/boss-grid-field.component';
import { BossGridHeaderTemplateComponent } from './boss-grid/boss-grid-header-template.component';
import { BossGridCellTemplateComponent } from './boss-grid/boss-grid-cell-template.component';
import { BossGridSerialFieldComponent } from './boss-grid/boss-grid-serial-field.component';
import { BossGridActionFieldComponent } from './boss-grid/boss-grid-action-field.component';
import { BossGridPagingFooterComponent } from './boss-grid/boss-grid-paging.component';
import { BossGridFooterComponent, BossGridEmptyComponent, BossGridHeaderComponent } from './boss-grid/boss-grid-schemas.component';
import { BossGridFilterOperatorDirective } from './boss-grid/boss-grid-filter-operator.directive';
import { BossGridFilterComponent } from './boss-grid/boss-grid-filter.component';
import { BossGridCustomFilterDirective } from './boss-grid/boss-grid-custom-filter.directive';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BossRowComponent } from './boss-row/boss-row.component';
import { BossLayoutComponent } from './boss-layout/boss-layout.component';
import { BossAutoFormComponent } from './boss-auto-form/boss-auto-form.component';
import { BossAutoListComponent } from './boss-auto-list/boss-auto-list.component';
import { BossTextboxComponent } from './contorl-components/boss-textbox.component';
import { BossControlWrapperComponent } from './boss-control-wrapper/boss-control-wrapper.component';
import { BossGridAutoFilterComponent } from './boss-grid/boss-grid-auto-filter.component';
import { BossSwitchComponent } from './contorl-components/boss-switch.component';
import { BossGridEnumFieldComponent } from './boss-grid/boss-grid-enum-field.component';
import { BossFormGridComponent } from './contorl-components/boss-form-grid.component';
import { BossDefaultActionsComponent } from './boss-auto-form/boss-default-actions.component';
import { BossConfirmComponent } from './dialogs/boss-confirm.component';
import { BossMessageComponent } from './dialogs/boss-message.component';
import { BossDialog } from './services/bossDialog';
import { BossExpandPanelComponent } from './boss-expand-panel/boss-expand-panel.component';
import { ErrorMessagePipe } from './pipes/ErrorMessagePipe';
import { BossReferenceComponent } from './contorl-components/boss-reference.component';
import { BossErrorComponent } from './contorl-components/boss-error.component';
import { BossAutoGridComponent } from './boss-auto-grid/boss-auto-grid.component';
import { BossReferenceSelectorComponent } from './dialogs/boss-reference-selector.component';
import { BossTextareaComponent } from './contorl-components/boss-textarea.component';
import { BossRadiolistComponent } from './contorl-components/boss-radiolist.component';
import { BossAutoFloatingDirective, BossAutoFloatingHostDirective } from './boss-auto-floating/boss-auto-floating.directive';
import { BossAutoFloating } from './services/bossAutoFloating';
import { ActionButton } from './services/ActionButton';
import { BossDatepickerComponent } from './contorl-components/boss-datepicker.component';
import { BossGridDatetimeFieldComponent } from './boss-grid/boss-grid-datetime-field.component';
import { FormGroupHelper } from './services/FormGroupHelper';
import { ListDeleter, ListDeleterFactory } from './services/ListDeleter';
import { ListLoader, ListLoaderFactory } from './services/ListLoader';
import { BossServerErrorComponent } from './dialogs/boss-server-error.component';
import { BossListMetadataHelper } from './services/BossListMetadataHelper';
import { ControlMetadata } from './services/form/ControlMetadata';
import { BossPasswordComponent } from './contorl-components/boss-password.component';
import { BossServerMessageComponent } from './dialogs/boss-server-message.component';
import { BossDropdownlistComponent } from './contorl-components/boss-dropdownlist.component';
import { BossCheckboxlistComponent } from './contorl-components/boss-checkboxlist.component';
import { BossDisplayComponent } from './contorl-components/boss-display.component';
import { BOSS_GRID_DEFAULT_PAGESIZE } from './boss-grid/tokens';
import { BossGridEnumEditFieldComponent } from '@boss/bosscontrol/boss-grid/boss-grid-enum-edit-field.component';
import { BossGridTextareaEditFieldComponent } from './boss-grid/boss-grid-testarea-edit-field.component';
import { BossGridEditFieldComponent } from './boss-grid/boss-grid-edit-field.component';
import { BossMultipleSelectComponent } from './contorl-components/boss-multiple-select.component';
import { BossQueryStatus } from './services/BossQueryStatus';
import { MatNativeDateModule, MAT_PLACEHOLDER_GLOBAL_OPTIONS, DateAdapter, NativeDateAdapter, MatDialog } from '@angular/material';
import { MaterialShareModule } from '../share/material.share.module';
import { BossFileUploadComponent } from '@boss/bosscontrol/contorl-components/boss-file-upload.component';
import { BossConfirmFileComponent } from '@boss/bosscontrol/dialogs/boss-confirm-file.component';
import { FileManagement } from './services/file/fileManagement'
import { BossFileComponent } from '@boss/bosscontrol/boss-file/boss-file.component';
import { BossImageCropperComponent } from '@boss/bosscontrol/dialogs/boss-image-cropper.component';
@NgModule({
  declarations: [
    BossGridComponent,
    BossGridFieldComponent,
    BossGridHeaderTemplateComponent,
    BossGridCellTemplateComponent,
    BossGridSerialFieldComponent,
    BossGridActionFieldComponent,
    BossGridPagingFooterComponent,
    BossGridFooterComponent,
    BossGridEmptyComponent,
    BossGridHeaderComponent,
    BossGridFilterComponent,
    BossGridAutoFilterComponent,
    BossLayoutComponent,
    BossRowComponent,
    BossAutoFormComponent,
    BossAutoListComponent,
    BossTextboxComponent,
    BossSwitchComponent,
    BossControlWrapperComponent,
    BossGridFilterOperatorDirective,
    BossGridCustomFilterDirective,
    BossGridEnumFieldComponent,
    BossFormGridComponent,
    BossDefaultActionsComponent,
    BossConfirmComponent,
    BossExpandPanelComponent,
    BossReferenceComponent,
    BossErrorComponent,
    ErrorMessagePipe,
    BossMessageComponent,
    BossAutoGridComponent,
    BossReferenceSelectorComponent,
    BossTextareaComponent,
    BossAutoFloatingDirective,
    BossAutoFloatingHostDirective,
    BossDatepickerComponent,
    BossGridDatetimeFieldComponent,
    BossServerErrorComponent,
    BossRadiolistComponent,
    BossPasswordComponent,
    BossDropdownlistComponent,
    BossServerMessageComponent,
    BossCheckboxlistComponent,
    BossDisplayComponent,
    BossGridEnumEditFieldComponent,
    BossGridTextareaEditFieldComponent,
    BossGridEditFieldComponent,
    BossMultipleSelectComponent,
    BossFileUploadComponent,
    BossConfirmFileComponent,
    BossFileComponent,
    BossImageCropperComponent
  ],
  entryComponents: [
    BossTextboxComponent,
    BossSwitchComponent,
    BossGridFieldComponent,
    BossGridSerialFieldComponent,
    BossGridActionFieldComponent,
    BossGridEnumFieldComponent,
    BossFormGridComponent,
    BossReferenceComponent,
    BossConfirmComponent,
    BossMessageComponent,
    BossReferenceSelectorComponent,
    BossTextareaComponent,
    BossDatepickerComponent,
    BossGridDatetimeFieldComponent,
    BossServerErrorComponent,
    BossRadiolistComponent,
    BossPasswordComponent,
    BossDropdownlistComponent,
    BossServerMessageComponent,
    BossCheckboxlistComponent,
    BossDisplayComponent,
    BossGridEnumEditFieldComponent,
    BossGridTextareaEditFieldComponent,
    BossMultipleSelectComponent,
    BossFileUploadComponent,
    BossConfirmFileComponent,
    BossFileComponent,
    BossImageCropperComponent
  ],
  imports: [
    ImageCropperModule,
    MaterialShareModule,
    MomentModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    MaterialShareModule,
    CommonModule,
    BossGridComponent,
    BossGridFieldComponent,
    BossGridHeaderTemplateComponent,
    BossGridCellTemplateComponent,
    BossGridSerialFieldComponent,
    BossGridActionFieldComponent,
    BossGridEnumFieldComponent,
    BossGridPagingFooterComponent,
    BossGridAutoFilterComponent,
    BossGridFilterComponent,
    BossGridFooterComponent,
    BossGridEmptyComponent,
    BossGridHeaderComponent,
    BossRowComponent,
    BossLayoutComponent,
    BossAutoFormComponent,
    BossAutoListComponent,
    BossControlWrapperComponent,
    BossTextboxComponent,
    BossSwitchComponent,
    BossGridFilterOperatorDirective,
    BossGridCustomFilterDirective,
    BossFormGridComponent,
    BossDefaultActionsComponent,
    BossReferenceComponent,
    BossErrorComponent,
    BossExpandPanelComponent,
    BossAutoGridComponent,
    BossAutoFloatingDirective,
    BossAutoFloatingHostDirective,
    BossDatepickerComponent,
    BossGridDatetimeFieldComponent,
    BossRadiolistComponent,
    BossPasswordComponent,
    BossServerMessageComponent,
    BossDropdownlistComponent,
    ErrorMessagePipe,
    BossCheckboxlistComponent,
    BossDisplayComponent,
    BossGridEnumEditFieldComponent,
    BossGridTextareaEditFieldComponent,
    BossMultipleSelectComponent,
    BossImageCropperComponent,
    BossFileUploadComponent,
    BossFileComponent
  ],
  providers: [
    FileManagement,
    BossQueryStatus,
    BossListMetadataHelper,
    ListDeleter,
    ListLoader,
    ListDeleterFactory,
    ListLoaderFactory,
    { provide: BOSS_GRID_DEFAULT_PAGESIZE, useValue: 20 },
    { provide: MAT_PLACEHOLDER_GLOBAL_OPTIONS, useValue: { float: 'always' } },
    { provide: DateAdapter, useClass: NativeDateAdapter },
    {
      provide: BossDialog,
      useClass: BossDialog,
      deps: [MatDialog]
    },
    BossAutoFloating,
    ActionButton,
    FormGroupHelper,
    ControlMetadata]
})
export class BossControlModule { }
