import { EnumHelpers } from '@boss/EnumHelpers';

export enum FunctionPermissionStatus {
  Denied = -1,
  NotSet = 0,
  Granted = 1
}
EnumHelpers.SetI18nNamespace(FunctionPermissionStatus, 'Enums.FunctionPermissionStatus');
EnumHelpers.SetCSharpName(FunctionPermissionStatus, 'Bossinfo.Models.Abastract.Enums.FunctionPermissionStatus');
