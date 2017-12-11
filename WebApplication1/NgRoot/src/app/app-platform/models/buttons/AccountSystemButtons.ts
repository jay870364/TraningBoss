import { PlatformProvider } from '@boss/PlatformProvider';
import { Injectable } from '@angular/core';
import { BossActionButton } from '@boss/decorator/IBossActionButton';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountSystem } from '../AccountSystem';
import { FormGroupHelper } from '@boss/bosscontrol/services/FormGroupHelper';
import { UserRole } from '@boss/platform/services/UserRole';
@Injectable()
export class GoDomainBindingButton extends BossActionButton<AccountSystem> {
  static provider = new PlatformProvider(GoDomainBindingButton, [ActivatedRoute, Router, FormGroupHelper, UserRole])
  text = 'Model.Platform.AccountSystem.網域設定';
  constructor(protected route: ActivatedRoute, protected router: Router, protected formgroupHelper: FormGroupHelper, userRole: UserRole) {
    super();
    this.visible = userRole.hasRole('Bossinfo.Module.Platform.SystemDomainBinding.View');
  }
  click($event, entry: AccountSystem, key: number) {
    this.router.navigate(['systemdomainbinding'], { queryParams: this.formgroupHelper.createQueryParams({ AccountSystemId: key }, true), relativeTo: this.route.parent });
  }
}
