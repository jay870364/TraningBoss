import { MenuItemType } from '../app-platform/models/MenuItemType';
import { BossApiModel } from '@boss/decorator/BossApiModel';
@BossApiModel('api/usermenu')
export class UserMenuItem {
  public Name: string;
  public Icon: string;
  public Type: MenuItemType;
  public Url: string;

  public FunctionDeveloperName: string;
  public Position: number;

  public ParentId: string;

  public RelationId: string;
}
