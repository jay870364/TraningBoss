import { BossApiModel } from '@boss/decorator/BossApiModel';
import { DataStatus } from '@enums/DataStatus';
import { PlatformSystem } from './PlatformSystem';
import { I18nNamespace } from '@boss/decorator/i18n/i18nNs';
import { Property } from '@boss/decorator/Property';
@BossApiModel('api/SystemFunction')
@I18nNamespace('Model.Platform.SystemFunction')
export class SystemFunction {
  Id = 0;
  @Property()
  SystemId: number;
  System: PlatformSystem;
  DeveloperName: string;
  Status: DataStatus = 0;
  CreatedTime: Date;
  CreatedBy: string;
  ModifiedTime: Date;
  LastModifiedBy: string;
}
