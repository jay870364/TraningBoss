
import { BossApiModel, Key } from '@boss/decorator/BossApiModel';
import { FunctionPermissionStatus } from '@enums/FunctionPermissionStatus';
import { AccountSystem } from './AccountSystem';

@BossApiModel('api/PlatformUserFunction')
export class PlatformUserFunction {

  @Key()// DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)
  public Id: number;
  // Required()// StringLength(50)
  public DeveloperName: string;
  // Required()// StringLength(50)
  public PermissionRole: string;

  public Permission: FunctionPermissionStatus;

  public AccountSystemId: number;

  public CreatedTime: Date;

  public CreatedBy: number;

  public LastModifiedTime: Date;

  public LastModifiedBy: number;

  public AccountSystem: AccountSystem;
}
