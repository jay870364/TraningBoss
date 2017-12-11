import { EnumHelpers } from '@boss/EnumHelpers';
export enum DataStatus {
  Disabled = 0,
  Enabled = 1
}
EnumHelpers.SetI18nNamespace(DataStatus, 'Enums.DataStatus');
EnumHelpers.SetCSharpName(DataStatus, 'Bossinfo.Models.Abastract.Enums.DataStatus');
