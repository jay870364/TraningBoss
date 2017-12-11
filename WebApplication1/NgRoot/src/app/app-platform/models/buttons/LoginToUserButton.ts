import { PlatformProvider } from '@boss/PlatformProvider';
import { Injectable, Optional, Inject } from '@angular/core';
import { IBossActionButton } from '@boss/decorator/IBossActionButton';
import { Router, ActivatedRoute } from '@angular/router';
import { BossEditForm } from '@boss/bosscontrol/services/form/BossEditForm';
import { PlatformUser } from '../PlatformUser';
import { DataSourceFactory } from '@boss/services/datasource/DataSourceFactory';
import { LoginToUser } from '../LoginToUser';
import { Identity } from '@boss/services/Identity';
import { UserRole } from '@boss/platform/services/UserRole';
@Injectable()
export class LoginToUserButton implements IBossActionButton<PlatformUser> {
  static provider = new PlatformProvider(LoginToUserButton, [Router, Identity, UserRole, DataSourceFactory]);
  color: string;
  text = 'Model.Platform.PlatformUser.LoginToUser';
  visible = true;
  enabled = true;
  constructor(protected router: Router, protected identity: Identity, protected userRole: UserRole, protected dsfac: DataSourceFactory, @Inject(BossEditForm) @Optional() protected form: BossEditForm<PlatformUser>) {
    if (form) {
      form.modelChanged.subscribe(data => {
        this.visible = form.isReadonly;
      })
    }
    this.visible = userRole.hasRole('LoginToUser');
  }
  click($event: MouseEvent, entry: PlatformUser, key) {
    const loginDs = this.dsfac.getDataSource(LoginToUser);
    loginDs.get(key).subscribe(login => {
      this.identity.login(login);
      this.router.navigateByUrl('/');
      window.location.reload();
    });

  }
}
