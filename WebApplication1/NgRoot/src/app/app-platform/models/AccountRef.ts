import { PlatformProvider } from '@boss/PlatformProvider';


import { BossApiModel, Key } from '@boss/decorator/BossApiModel';
import { BossListField } from '@boss/decorator/list/BossListField';
import { I18nNamespace } from '@boss/decorator/i18n/i18nNs';
import { Injectable, Inject, Optional } from '@angular/core';
import { BossListFilter } from '@boss/decorator/list/BossListFilter';
import { ListLoader } from '@boss/bosscontrol/services/ListLoader';
import { BossList } from '@boss/decorator/list/BossList';
import { OdataDataSource } from '@boss/services/datasource/odata/OdataDatasource';
import { Property } from '@boss/decorator/Property';
import { BossEditForm } from '@boss/bosscontrol/services/form/BossEditForm';


export class Loader extends ListLoader {
  constructor(protected editForm: BossEditForm<AccountRef>) {
    super();
  }
  loader(ds: OdataDataSource<AccountRef>, load) {
    if (this.editForm && this.editForm.key) {
      load(ds.where('Id', '!=', this.editForm.key));
    } else {
      load(ds);
    }
  }
}

@BossApiModel('api/Account')
@I18nNamespace('Model.Platform.Account')
@BossList({
  loader: new PlatformProvider<Loader>(Loader, [[new Optional(), BossEditForm]])
})
export class AccountRef {

  @Key()
  @Property()
  public Id: number;
  @BossListFilter()
  @BossListField()
  public Name: string;
  @BossListFilter()
  @BossListField()
  public Code: string
}
