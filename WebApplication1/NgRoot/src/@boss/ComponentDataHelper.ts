import { BossGridEnumEditFieldComponent } from './bosscontrol/boss-grid/boss-grid-enum-edit-field.component';
import { BossGridEnumFieldComponent } from './bosscontrol/boss-grid/boss-grid-enum-field.component';
export module ComponentDataHelper {
  export function ConvertToBossListFiledOptions(enumType: Object, width?: string, edit?: boolean) {
    return {
      componentData: {
        enumType: enumType,
        width: width || '130px',
        align: 'center'
      }, component: edit ? BossGridEnumEditFieldComponent : BossGridEnumFieldComponent
    }
  }
}

