import { FormGroupHelper } from '@boss/bosscontrol/services/FormGroupHelper';
import { PlatformProvider } from '@boss/PlatformProvider';
import { Injectable, Optional, Inject } from '@angular/core';
import { BossActionButton } from '@boss/decorator/IBossActionButton';
import { Router, ActivatedRoute } from '@angular/router';
import { Account } from '../Account';
import { BossEditForm } from '@boss/bosscontrol/services/form/BossEditForm';
import { UserRole } from '@boss/platform/services/UserRole';

export class GoAccountSystemButton extends BossActionButton<Account> {
  static provider = new PlatformProvider(GoAccountSystemButton, [ActivatedRoute, Router, FormGroupHelper, UserRole, [new Optional(), BossEditForm]]);
  text = 'Model.Platform.Account.系統設定';
  constructor(protected route: ActivatedRoute, protected router: Router,
    protected formgroupHelper: FormGroupHelper, userRole: UserRole, form: BossEditForm<Account>) {
    super();
    this.visible = userRole.hasRole('Bossinfo.Module.Platform.System.View');
    if (form) {
      form.modelChanged.subscribe(data => { this.visible = form.isReadonly; });
    }
  }
  click($event, entry: Account, key: number) {
    this.router.navigate(['accountsystem'],
      {
        queryParams: this.formgroupHelper.createQueryParams({ OwnerId: entry.Id }, true),
        relativeTo: this.route.parent
      });
  }

}
