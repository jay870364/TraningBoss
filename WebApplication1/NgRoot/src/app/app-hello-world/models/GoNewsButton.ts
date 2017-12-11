import { BossActionButton } from '@boss/decorator/IBossActionButton';
import { PlatformProvider } from '@boss/PlatformProvider';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroupHelper } from '@boss/bosscontrol/services/FormGroupHelper';
import { UserRole } from '@boss/platform/services/UserRole';
import { Category } from './Category';

export class GoNewsButton extends BossActionButton<Category> {
  static provider = new PlatformProvider(GoNewsButton, [ActivatedRoute, Router, FormGroupHelper, UserRole]);
  public text = '新聞';
  constructor(protected route: ActivatedRoute, protected router: Router,
    protected formgroupHelper: FormGroupHelper, userRole: UserRole) {
    super();
    this.visible = userRole.hasRole('Bossinfo.Module.HelloWorld.News.View'); //大小寫

  }
  public click($event, entry: Category, key: number) {
    this.router.navigate(['news'],
      {
          queryParams: this.formgroupHelper.createQueryParams({ CategoryId: entry.Id }, true),
          relativeTo: this.route.parent
      });
  }
}
