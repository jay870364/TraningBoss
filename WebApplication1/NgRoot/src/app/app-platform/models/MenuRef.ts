import { BossListFilter } from '@boss/decorator/list/BossListFilter';
import { PlatformSystem } from './PlatformSystem';
import { AccountSystem } from './AccountSystem';
import { BossApiModel, Key } from '@boss/decorator/BossApiModel';
import { MenuItem } from '../models/MenuItem';
import { BossListField } from '@boss/decorator/list/BossListField';
import { I18nNamespace } from '@boss/decorator/i18n/i18nNs';

@BossApiModel('api/Menu')
@I18nNamespace('Model.Platform.Menu')
export class MenuRef {

  @Key()
  public Id: number;
  @BossListField() @BossListFilter()
  public Name: string;
}
