import { PlatformProvider } from './../../../../@boss/PlatformProvider';
import { Injectable, Optional } from '@angular/core';
import { IBossActionButton } from '@boss/decorator/IBossActionButton';
import { Router, ActivatedRoute } from '@angular/router';
import { Role } from '../Role';
import { BossEditForm } from '@boss/bosscontrol/services/form/BossEditForm';
import { PlatformUser } from '../PlatformUser';
export class UserPermissionButton implements IBossActionButton<PlatformUser> {
  static provider = new PlatformProvider(UserPermissionButton, [Router, ActivatedRoute, [new Optional(), BossEditForm]])
  color: string;
  text = 'Model.Platform.PlatformUser.權限';
  visible = true;
  enabled = true;
  constructor(protected router: Router, protected route: ActivatedRoute, protected form: BossEditForm<Role>) {
    if (form) {
      form.modelChanged.subscribe(data => {
        this.visible = form.isReadonly;
      })
    }
  }
  click($event: MouseEvent, entry: PlatformUser, key) {
    this.router.navigate(['platform', 'user', 'function', key], { queryParamsHandling: 'merge' });
  }
}
