import { PlatformProvider } from '@boss/PlatformProvider';
import { Injectable } from '@angular/core';
import { WarpperControl } from '@boss/bosscontrol/services/WarpperControl';
import { UserRole } from '@boss/platform/services/UserRole';

export class HideIfNoModuleRole implements WarpperControl {
  static provider = new PlatformProvider(HideIfNoModuleRole, [UserRole]);
  public classes: any;
  public styles: any;
  constructor(userRole: UserRole) {
    if (!userRole.hasRole('Bossinfo.Module.Platform')) {
      this.styles = { display: 'none' };
    }
  }
}
