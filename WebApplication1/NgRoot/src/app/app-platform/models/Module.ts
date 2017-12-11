import { BossApiModel, Key } from '@boss/decorator/BossApiModel';
import { BossListField } from '@boss/decorator/list/BossListField';
@BossApiModel('api/SystemModule')
export class Module {
  @Key()
  @BossListField()
  Module: string;
}
