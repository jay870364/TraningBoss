

import { Component, Input, HostBinding, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'boss-expand-panel',
  templateUrl: './boss-expand-panel.component.html',
  styleUrls: ['boss-expand-panel.component.scss']
})
export class BossExpandPanelComponent {
  @Input() public legend: string;
  protected _expanded = true;
  @Input() @Output() public get expanded(): boolean {
    return this._expanded;
  }
  public set expanded(state: boolean) {
    if (this._expanded !== state) {
      this._expanded = state;
      this.stateChgange.emit(state);
    }
  }

  @Output() public stateChgange = new EventEmitter<boolean>();

}
