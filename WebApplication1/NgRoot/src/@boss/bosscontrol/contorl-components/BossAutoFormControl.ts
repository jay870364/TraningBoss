import { Input, HostBinding, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { BossAutoForm } from '../services/form/BossAutoForm';
import { Subscription } from 'rxjs/Subscription';
export abstract class BossAutoFormControl implements OnInit, OnDestroy {

  @HostBinding('class.flexfull') flexfull = true;
  public form: BossAutoForm;
  @Input() public group: FormGroup;
  @Input() public controlName: string;
  @Input() public i18nNamespace: string;
  @Input() public disabled: boolean;
  protected subs: Subscription[] = [];
  public control: AbstractControl;
  public get i18nName() {
    return `${this.i18nNamespace}.${this.controlName}`;
  }
  ngOnInit() {
    this.control = this.group.get(this.controlName);
    if (this.disabled === true) {
      this.subs.push(this.control.statusChanges.subscribe(() => {
        if (!this.control.disabled) {
          this.control.disable();
        }
      }));
    }
  }
  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }
}
