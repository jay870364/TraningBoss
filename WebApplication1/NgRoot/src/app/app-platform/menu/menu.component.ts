import { Component, OnInit, Inject } from '@angular/core';
import { BossFormBase } from '@boss/bosscontrol/services/form/BossFormBase';
import { BossAutoForm } from '@boss/bosscontrol/services/form/BossAutoForm';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Menu } from '../models/Menu';
import { DataSourceFactory } from '@boss/services/datasource/DataSourceFactory';
import { MenuItem } from '../models/MenuItem';
import { MenuItemType } from '../models/MenuItemType';
import { EnumHelpers } from '@boss/EnumHelpers';
import { FunctionDetial } from '../models/FunctionDetail';
import { Guid } from '@boss/Guid';
import { UserRole } from '@boss/platform/services/UserRole';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [UserRole, BossFormBase, { provide: BossAutoForm, useExisting: BossFormBase }]
})
export class MenuComponent implements OnInit {
  public menuItemType = MenuItemType;
  public formGroup: FormGroup;
  public menuItems: MenuItem[] = [];
  public functionDetailModel = FunctionDetial;
  public typeOptions = EnumHelpers.ConvertToBossControlOptions(MenuItemType).filter(x => x.value !== MenuItemType.Category && x.value !== MenuItemType.Unknow);
  public addChild(array: FormArray, type: MenuItemType, model: MenuItem = {} as MenuItem) {
    let parentId: string;
    const parent = array.parent.get('RelationId');
    if (parent) {
      parentId = parent.value;
    }
    const group = new FormGroup({
      Id: new FormControl(model.Id),
      Icon: new FormControl(model.Icon),
      RelationId: new FormControl(Guid.newGuid()),
      ParentId: new FormControl(parentId),
      Name: new FormControl(model.Name, Validators.required),
      MenuId: new FormControl(this.form.key),
      Url: new FormControl(model.Url, control => {
        if (control.parent) {
          const v = control.parent.get('Type').value;
          return (v === MenuItemType.Iframe || v === MenuItemType.OpenLink) ? Validators.required(control) : null
        }
      }),
      FunctionDeveloperName: new FormControl(model.FunctionDeveloperName, control => {
        if (control.parent) {
          const v = control.parent.get('Type').value;
          return v === MenuItemType.Function ? Validators.required(control) : null;
        }
      }),
      Position: new FormControl(model.Position),
      Type: new FormControl(type, Validators.required),
      MenuItems: new FormArray([])
    });
    array.push(group);
    this.setItemPosition(array);
    return group;
  }
  public removeChild(array: FormArray, i: number) {
    array.controls.splice(i, 1);
    array.updateValueAndValidity();
  }
  public typeChanged(item: FormGroup) {
    item.get('Url').updateValueAndValidity();
    item.get('FunctionDeveloperName').updateValueAndValidity();
  }
  public orderingUp(array: FormArray, i: number) {
    const me = array.controls[i];
    array.controls[i] = array.controls[i - 1];
    array.controls[i - 1] = me;
    this.setItemPosition(array);
    array.updateValueAndValidity();
  }
  public orderingDown(array: FormArray, i: number) {
    const me = array.controls[i];
    array.controls[i] = array.controls[i + 1];
    array.controls[i + 1] = me;
    this.setItemPosition(array);
    array.updateValueAndValidity();
  }
  public applyItems(items: MenuItem[], array: FormArray) {
    items.forEach(item => {
      const group = this.addChild(array, item.Type, item);
      if (item.MenuItems && item.MenuItems.length) {
        this.applyItems(item.MenuItems, group.get('MenuItems') as FormArray);
      }
    });
  }
  public createNestedItems(items: MenuItem[]): MenuItem[] {
    const base = items.filter(x => !x.ParentId);
    const map: { [id: string]: MenuItem } = {};
    items.forEach(x => map[x.RelationId] = x);
    items.filter(x => x.ParentId).forEach(x => {
      if (x.ParentId in map) {
        const parent = map[x.ParentId];
        if (!parent.MenuItems) {
          parent.MenuItems = [];
        }
        parent.MenuItems.push(x);
      }
    });
    return base;
  }
  public setItemPosition(arr: FormArray) {
    arr.controls.forEach((c, i) => {
      c.get('Position').setValue(i);
    });
  }
  public createFlatFormNested(items: MenuItem[]): MenuItem[] {
    const flat = [];
    items.forEach(x => {
      const sub = x.MenuItems;
      flat.push(x);
      if (sub && sub.length) {
        this.createFlatFormNested(sub).forEach(y => flat.push(y));
      }
    });
    return flat;
  }
  protected getItems(model) {
    if (this.formGroup) {
      const itemFac = this.dsFac.getDataSource(MenuItem);
      if (this.form.keyOrCloneKey) {
        const array = this.formGroup.get('Items') as FormArray;
        while (array.controls.length) {
          array.removeAt(0);
        }
        array.updateValueAndValidity();
        itemFac.where('MenuId', '=', parseFloat(this.form.keyOrCloneKey)).toSubject().subscribe(list => {

          this.applyItems(this.createNestedItems(list.data.map(x => {
            if (this.form.isClone) {
              x.MenuId = null;
              x.Menu = null;
            }
            return x;
          }).sort((a, b) => a.Position - b.Position)), array);
          this.form.checkReadyOnly();
        });
      }
    }
  }


  constructor(public form: BossFormBase<Menu>, protected dsFac: DataSourceFactory) {
    this.formGroup = new FormGroup({
      Name: new FormControl(null, Validators.required),
      Items: new FormArray([])
    });
    form.buildModelFormRoute();
    form.valueTransformer = model => {
      const clone = Object.assign({} as MenuItem, model);
      clone.Items = this.createFlatFormNested(clone.Items);
      return clone;
    };
    form.init(this.formGroup);
    form.modelChanged.subscribe(model => this.getItems(model));
    form.enableBackWhenSaved();



  }

  ngOnInit() {
  }

}
