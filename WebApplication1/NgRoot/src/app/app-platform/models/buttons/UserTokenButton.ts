import { PlatformProvider } from './../../../../@boss/PlatformProvider';
import { Injectable, Optional } from '@angular/core';
import { IBossActionButton } from '@boss/decorator/IBossActionButton';
import { Router, ActivatedRoute } from '@angular/router';
import { Role } from '../Role';
import { BossEditForm } from '@boss/bosscontrol/services/form/BossEditForm';
import { PlatformUser } from '../PlatformUser';
import { UserRole } from '@boss/platform/services/UserRole';
@Injectable()
export class UserTokenButton implements IBossActionButton<PlatformUser> {
  static provider = new PlatformProvider(UserTokenButton, [Router, UserRole]);
  color: string;
  text = 'Model.Platform.PlatformUser.產生Token';
  visible = true;
  enabled = true;
  constructor(protected router: Router, userRole: UserRole) {
    this.visible = userRole.hasRole('CreateToken');
  }
  click($event: MouseEvent, entry: PlatformUser, key) {
    this.router.navigate(['platform', 'user', 'token', key], { queryParamsHandling: 'merge' });
  }
}
