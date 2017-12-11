import { Component, Input } from '@angular/core';

@Component({
    selector: 'navi-bar',
    templateUrl: './navi-bar.component.html',
    styleUrls: ['./navi-bar.component.scss']
})
export class NaviBarComponent {

    constructor() { }

    @Input() public color: string = "primary";
}

