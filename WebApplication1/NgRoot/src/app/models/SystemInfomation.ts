import { BossApiModel } from '@boss/decorator/BossApiModel';
@BossApiModel('api/Login')
export class SystemInfomation {
  Host: string;
  SystemAvaliable: boolean;
  SystemExists: boolean;
  Name: string;
  DomainStatus: boolean;
  SystemStatus: boolean;
  Id: number;
  AccountId: number;
  SystemId: number;
}
