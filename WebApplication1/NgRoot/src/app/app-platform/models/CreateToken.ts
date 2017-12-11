import { BossApiModel } from '@boss/decorator/BossApiModel';
@BossApiModel('api/PlatformUser/$token')
export class CreateToken {
  UserId: number;
  Expire?: Date;
  Token?: string;
}
