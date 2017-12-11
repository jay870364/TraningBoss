
import { BossApiModel, Key } from '@boss/decorator/BossApiModel';
import { DataStatus } from '@enums/DataStatus';
import { BossListField } from '@boss/decorator/list/BossListField';
import { BossGridEnumFieldComponent } from '@boss/bosscontrol/boss-grid/boss-grid-enum-field.component';
import { I18nNamespace } from '@boss/decorator/i18n/i18nNs';
import { BossFormControl } from '@boss/decorator/form/BossFormControl';
import { BossSwitchComponent } from '@boss/bosscontrol/contorl-components/boss-switch.component';
import { BossForm, IBossFormLayout } from '@boss/decorator/form/BossForm';
import { BossFormTabLayout } from '@boss/decorator/form/BossFormLayout';
import { Validators } from '@angular/forms';
import { BossReferenceComponent } from '@boss/bosscontrol/contorl-components/boss-reference.component';
import { AccountRef } from './AccountRef';
import { BossListFilter } from '@boss/decorator/list/BossListFilter';
import { BossList } from '@boss/decorator/list/BossList';
import { GoAccountSystemButton } from './buttons/AccountButtons';
import { CustomValidators } from '@boss/CustomValidators';
import { PredefinedComponentData } from '../../PredefinedComponentData';
export function layout(): IBossFormLayout<Account> {
  return [
    [x => x.Code, x => x.Name, x => x.Status],
    [x => x.ParentAccountId],
    [x => x.Remark],
    new BossFormTabLayout<Account>({
      'Model.Platform.Account.Detail': [
        [x => x.FullName, x => x.EName, x => x.InvoiceTitle],
        [x => x.TaxIDNumber, x => x.Telephone, x => x.Fax],
        [x => x.ZipCode, x => x.Address]
      ],
      'Model.Platform.Account.Contact': [
        [x => x.ContactPersonName, x => x.ContactPersonEName, x => x.JobTitle],
        [x => x.ContactPersonTelephone, x => x.ContactPersonFax],
        [x => x.ContactPersonBackupEmail, x => x.ContactPersonAddress],
        [x => x.ContactPersonRemark]
      ]
    })
  ];
}

@BossApiModel('api/Account')
@I18nNamespace('Model.Platform.Account')
@BossForm(layout(), {
  actions: [GoAccountSystemButton.provider]
})
@BossList({
  actions: [GoAccountSystemButton.provider]
})
export class Account {

  @Key() public Id: number;

  @BossListField({ linkToView: true }) @BossListFilter() @BossFormControl({ validator: [Validators.required, Validators.maxLength(100)] }) public Code: string;

  @BossFormControl({ validator: [Validators.required, Validators.maxLength(100)] }) public Name: string;

  @BossListField() @BossFormControl() public FullName: string;

  @BossFormControl() public EName: string;

  @BossListField({ header: 'ParentAccount', field: 'ParentAccount.Name' }) public ParentAccount: Account;

  @BossFormControl({ component: BossReferenceComponent, componentData: { modelType: AccountRef, field: 'Name' } }) public ParentAccountId: number;

  @BossFormControl() public InvoiceTitle: string;

  @BossFormControl() public TaxIDNumber: string;

  @BossFormControl() public Telephone: string;

  @BossFormControl() public Fax: string;

  @BossFormControl() public ZipCode: string;

  @BossFormControl() public Address: string;

  @BossFormControl() public Remark: string;

  @BossFormControl() public ContactPersonName: string;

  @BossFormControl() public ContactPersonEName: string;

  @BossFormControl() public JobTitle: string;

  @BossFormControl() public ContactPersonTelephone: string;

  @BossFormControl() public ContactPersonFax: string;

  @BossFormControl() public ContactPersonAddress: string;

  @BossFormControl({ validator: CustomValidators.emailOrEmpty }) public ContactPersonBackupEmail: string;

  @BossFormControl() public ContactPersonRemark: string;

  @BossListField({ componentData: PredefinedComponentData.statusEnum, component: BossGridEnumFieldComponent })
  @BossFormControl({ component: BossSwitchComponent })
  public Status: DataStatus = 0;


  public CreatedTime: Date;

  public CreatedBy: string;

  public ModifiedTime: Date;

  public LastModifiedBy: string;
}
