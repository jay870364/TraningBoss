
import { BossApiModel, Key } from '@boss/decorator/BossApiModel';
import { PlatformUser } from './PlatformUser';
import { Role } from './Role';

@BossApiModel('api/PlatformUserRole')
export class PlatformUserRole {

  @Key()
  public Id: number;

  public UserId: number;

  public User: PlatformUser;

  public RoleId: number;

  public Role: Role;

  public CreatedTime: Date;

  public CreatedBy: number;

  public LastModifiedTime: Date;

  public LastModifiedBy: number;
}

