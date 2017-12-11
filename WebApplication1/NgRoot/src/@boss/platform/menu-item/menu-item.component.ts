import { Router } from '@angular/router';
import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { IMenuItem } from '../menuItem';
import { BossQueryStatus } from '@boss/bosscontrol/services/BossQueryStatus';
@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @HostBinding('class.is-group') public get isGroup() {
    return this.menuItem.child && this.menuItem.child.length > 0;
  }
  @Input() menuItem: IMenuItem;
  @Input() expand = true;
  public clearQueryStatus() {
    this.queryStauts.clear();
  }
  public routeTo(url: string) {
    this.clearQueryStatus();
    this.router.navigateByUrl(url);
  }
  constructor(protected queryStauts: BossQueryStatus, protected router: Router) { }

  ngOnInit() {
  }

}
