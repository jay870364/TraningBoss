import { BossDropdownlistComponent } from '@boss/bosscontrol/contorl-components/boss-dropdownlist.component';
import { IBossListFilterOptions } from './decorator/list/BossListFilter';
import { BossGridEnumFieldComponent } from '@boss/bosscontrol/boss-grid/boss-grid-enum-field.component';
import { BossGridEnumEditFieldComponent } from '@boss/bosscontrol/boss-grid/boss-grid-enum-edit-field.component';
import { I18N_NAMESPACE, CSHARP_NAME } from './StringKeys';
export module EnumHelpers {
  function isIndex(key: string): boolean {
    // tslint:disable-next-line:no-bitwise
    const n = ~~Number(key);
    return String(n) === key || key.startsWith('0_');
  }
  export function ConvertToBossControlOptions(enumType: Object) {
    return Object.keys(enumType).filter(key => !isIndex(key)).map(e => {
      return {
        text: e,
        value: enumType[e]
      }
    })
  }
  export function ConvertToBossComponentData(enumType: Object, i18n: boolean = true) {
    return {
      optionsI18nNamespace: i18n ? enumType[I18N_NAMESPACE] : undefined,
      options: ConvertToBossControlOptions(enumType)
    }
  }
  export function SetI18nNamespace(enumType: Object, i18nNamespace: string) {
    enumType[I18N_NAMESPACE] = i18nNamespace;
  }
  export function SetCSharpName(enumType: Object, csharpName: string) {
    enumType[CSHARP_NAME] = csharpName;
  }
  export function ConvertToBossFilterDropdownOptions(enumType: Object, i18n: boolean = true): IBossListFilterOptions {
    return {
      component: BossDropdownlistComponent,
      operator: '=',
      componentData: {
        optionsI18nNamespace: i18n ? enumType[I18N_NAMESPACE] : undefined,
        noValueText: 'All',
        options: Object.keys(enumType).filter(key => !isIndex(key)).map(e => {
          return {
            text: e,
            value: `${enumType[CSHARP_NAME]}'${e}'`
          }
        })
      }
    };
  }
}
