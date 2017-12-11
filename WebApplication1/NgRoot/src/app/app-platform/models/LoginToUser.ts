import { BossApiModel } from '@boss/decorator/BossApiModel';
import { ILogin } from '@boss/services/Identity';

@BossApiModel('api/logintouser')
export class LoginToUser implements ILogin {
  UserId?: number;
  AccountId?: number;
  Name?: string;
  Token?: string;
  Permissions?: string[];
  AccountSystemId?: number;
}
