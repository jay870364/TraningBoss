import { Role } from './Role';
import { BossApiModel, Key } from '@boss/decorator/BossApiModel';
import { BossListField } from '@boss/decorator/list/BossListField';
import { I18nNamespace } from '@boss/decorator/i18n/i18nNs';
@BossApiModel('api/IFunctionDetail')
@I18nNamespace('Model.Platform.FunctionDetial')
export class FunctionDetial {
  EntryUrl: string;
  @BossListField()
  Name: string;
  @BossListField()
  Module: string;
  @Key()
  Id: string;
  Roles: Role[];
}
