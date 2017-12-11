import { BossGridFieldComponent } from './boss-grid-field.component';
import { Component, forwardRef, Input, Inject, Host } from '@angular/core';
import { BossGridComponent } from './boss-grid.component';
import { BOSS_GRID_FILED } from './tokens';
@Component({
  selector: 'boss-grid-serial-field',
  template: '<ng-template #baseCellTemplate let-index="index+1"><span [innerText]="serialStart+index"></span></ng-template>'
  + '<ng-template #baseHeaderTemplate let-header><span [innerText]="header||\'#\'"></span></ng-template>',
  providers: [{ provide: BOSS_GRID_FILED, useExisting: forwardRef(() => BossGridSerialFieldComponent) }]
})
export class BossGridSerialFieldComponent extends BossGridFieldComponent {
  protected onSetup() {
    this.width = '40px';
    this.align = 'center';
  }
  public get serialStart() {
    if (this.extensionData['BossGridPagingFooterComponent']) {
      const pd = this.extensionData['BossGridPagingFooterComponent'];
      return (pd.page - 1) * pd.pageOptionValue;
    } else {
      return 0;
    }
  }
}
