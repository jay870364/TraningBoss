import { Component, Input, ViewChild, AfterViewInit, SimpleChanges, ChangeDetectorRef, HostBinding, OnInit } from '@angular/core';
import { IMenuItem } from '../../menuItem';
import { Router } from '@angular/router';
import { HttpStatus } from '../../../services/http/HttpStatus';
import { BossDialog } from '../../../bosscontrol/services/bossDialog';
import { MatSidenav } from '@angular/material';
import { Identity } from '../../../services/Identity';
import { UserGuard } from '../../guard/user-guard';
import { DataSourceFactory } from '../../../services/datasource/DataSourceFactory';
import { MenuProvider } from '../../MenuProvider';
import { BossApiModel } from '@boss/decorator/BossApiModel';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'boss-admin-layout',
  templateUrl: './boss-admin-layout.component.html',
  styleUrls: ['./boss-admin-layout.component.scss']
})
export class BossAdminLayoutComponent implements AfterViewInit, OnInit {
  public logoutMenuItem = {
    title: 'Logout',
    icon: 'power_settings_new',
    click: () => {
      this.identity.logout();
    }
  };
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  @Input() public loading = false;
  public logined = false;
  hostClass = 'light-theme';
  public httpRequest: number;
  public userInfo: UserInfo;
  public toggle() {
    this.sidenav.toggle();
  }
  protected setTheme(name: string) {
    document.querySelector('body').className = name;
  }
  themeChange() {
    this.setTheme(this.hostClass);
    localStorage.setItem('theme', this.hostClass);
  }
  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.hostClass = theme;
      this.setTheme(theme);
    }
  }
  menuStatusControlBinding() {
    this.sidenav.onOpen.subscribe(() => {
      if (this.logined) {
        localStorage.setItem('menu-open', '1');
      }
    })
    this.sidenav.onClose.subscribe(() => {
      if (this.logined) {
        localStorage.setItem('menu-open', '0');
      }
    })
    this.checkMenuStatus();
  }
  checkMenuStatus() {
    if (this.sidenav) {
      this.sidenav.opened = this.logined && localStorage.getItem('menu-open') === '1';
      this.cdr.detectChanges();
    }
  }
  ngAfterViewInit() {
    this.menuStatusControlBinding();
  }
  constructor(title: Title, guard: UserGuard, router: Router, httpStatus: HttpStatus, dialog: BossDialog,
    protected cdr: ChangeDetectorRef, protected identity: Identity, public menuProvider: MenuProvider, dsfac: DataSourceFactory) {
    const userinfoDs = dsfac.getDataSource(UserInfo);
    httpStatus.statusChanged.subscribe(n => {
      this.loading = n > 0;
      this.httpRequest = n;
    });
    httpStatus.error.subscribe(e => {
      dialog.serverError(e);
    })
    httpStatus.message.subscribe(e => {
      dialog.serverMessage(e);
    })
    httpStatus.needLogin.subscribe(() => {
      identity.logout();

    })
    identity.logined.subscribe(v => {
      if (this.logined && !v) {
        this.userInfo = null;
        setTimeout(() => router.navigate(['/login'], { queryParams: { returnUrl: router.url } }));
      }
      if (v) {
        userinfoDs.toSubject().subscribe(x => {
          this.userInfo = x.data as any;
          title.setTitle(this.userInfo.SystemName);
        })
      }

      this.logined = v;

      this.checkMenuStatus();
    });
  }
}
@BossApiModel('api/userinfo')
export class UserInfo {
  public SystemName: string;
  public UserName: string
}
