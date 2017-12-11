

import { BossApiModel, Key } from '@boss/decorator/BossApiModel';
import { BossListField } from '@boss/decorator/list/BossListField';
import { I18nNamespace } from '@boss/decorator/i18n/i18nNs';
import { Injectable } from '@angular/core';
import { BossListFilter } from '@boss/decorator/list/BossListFilter';

@BossApiModel('api/PlatformSystem')
@I18nNamespace('Model.Platform.PlatformSystem')
export class SystemRef {
  @Key()
  public Id: number;
  @BossListField()
  @BossListFilter()
  public Name: string;
}
