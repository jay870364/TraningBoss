import { Router } from '@angular/router';
import { IBossActionButton } from '@boss/decorator/IBossActionButton';
import { Injectable, Injector, Inject } from '@angular/core';

export class RouteButton implements IBossActionButton<any> {
  visible = true;
  enabled = true;
  public get text() {
    return this.setting.text;
  }
  public setting: ICustomButtonSetting;
  constructor(protected router: Router) {

  }
  click($event: MouseEvent, entry: any, key: any): void {
    this.router.navigateByUrl(this.setting.getPath(entry, key), { queryParamsHandling: 'merge' });
  }

}
export interface ICustomButtonSetting {
  text: string;
  getPath: (entry: any, key: any) => string;
}
@Injectable()
export class CustomButtons {
  public buttonsMap: { [key: string]: RouteButton[] } = {};
  protected injector: Injector;
  constructor(injector: Injector) {
    this.injector = Injector.create([{ provide: RouteButton, deps: [Router] }], injector);
  }
  public getButton(systemCode: string, functionCode: string) {
    return this.buttonsMap[`${systemCode}+${functionCode}`] || [];
  }
  public setButton(settings: ICustomButtonSetting[], systemCode: string, modelFunction: string[]) {
    modelFunction.forEach(func => {
      this.buttonsMap[`${systemCode}+${func}`] = settings.map(setting => {
        const btn = this.injector.get(RouteButton);
        btn.setting = setting;
        return btn;
      });
    })
  }
}
