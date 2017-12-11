import { BossApiModel, Key } from '@boss/decorator/BossApiModel';
import { MenuItemType } from './MenuItemType';
import { Menu } from './Menu';
import { BossFormControl } from '@boss/decorator/form/BossFormControl';
import { Validators } from '@angular/forms';
import { EnumHelpers } from '@boss/EnumHelpers';
import { BossRadiolistComponent } from '@boss/bosscontrol/contorl-components/boss-radiolist.component';
import { BossReferenceComponent } from '@boss/bosscontrol/contorl-components/boss-reference.component';
import { BossForm, IBossFormLayout } from '@boss/decorator/form/BossForm';

@BossApiModel('api/MenuItem')
export class MenuItem {

  @Key()
  public Id: number;


  public MenuId: number;

  public Menu: Menu;
  public Name: string;
  public Icon: string;
  public Type: MenuItemType;
  public Url: string;

  public FunctionDeveloperName: string;
  public Position: number;

  public ParentId: string;

  public RelationId: string;

  public Parnet: Menu;
  public MenuItems: MenuItem[];

  public CreatedTime: Date;

  public CreatedBy: number;

  public ModifiedTime: Date;

  public LastModifiedBy: number;
}
