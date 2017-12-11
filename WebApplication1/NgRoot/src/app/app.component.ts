import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { AppMenu } from './services/AppMenu';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public menu;
  public logined = false;
  constructor(translate: TranslateService) {
    translate.setDefaultLang('zh-tw');
  }
  ngOnInit() {

  }
}
