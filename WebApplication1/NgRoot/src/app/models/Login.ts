import { BossApiModel } from '@boss/decorator/BossApiModel';
@BossApiModel('api/Login')
export class Login {
  UserId?: number;
  AccountId?: number;
  Name?: string;
  SystemCode?: string;
  Account: string;
  Password: string;
  Token?: string;
  Permissions?: string[];
  AccountSystemId?: number;
}
