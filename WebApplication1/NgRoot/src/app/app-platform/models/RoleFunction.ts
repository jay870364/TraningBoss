import { BossApiModel, Key } from '@boss/decorator/BossApiModel';
import { Role } from './Role';
import { FunctionPermissionStatus } from '@enums/FunctionPermissionStatus';
import { Property } from '@boss/decorator/Property';

@BossApiModel('api/RoleFunction')
export class RoleFunction {

  @Key()// DatabaseGenerated(PlatformSystem.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)
  public Id: number;
  // Required()// StringLength(50)
  public DeveloperName: string;
  // Required()// StringLength(50)
  public PermissionRole: string;
  public Permission: FunctionPermissionStatus;

  public CreatedTime: Date;

  public CreatedBy: number;

  public ModifiedTime: Date;

  public LastModifiedBy: number;

  public Role: Role;

  @Property()
  public RoleId: number;
}
