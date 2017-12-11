import { PlatformProvider } from '@boss/PlatformProvider';
import { AbstractControl, Validators, Validator, AsyncValidator, ValidatorFn } from '@angular/forms';
import { Provider, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BossFormBase } from '@boss/bosscontrol/services/form/BossFormBase';
export module CustomValidators {
  export function textareaNotAllowEmptyLine(control: AbstractControl): { [key: string]: any } {
    if (control.value) {
      if ((control.value as string).split('\n').filter(v => !v).length) {
        return {
          textareaNotAllowEmptyLine: true
        }
      }
    }
    return null;
  }
  export function emailOrEmpty(control: AbstractControl): { [key: string]: any } {
    if (control.value) {
      return Validators.email(control);
    } else {
      return null;
    }
  }
  export function validateIfPropertyValue(property: string, value: any, validator: ValidatorFn) {
    return function (control: AbstractControl): { [key: string]: any } {
      if (control.parent && control.parent.get(property).value === value) {
        return validator(control)
      } else {
        return null;
      }
    }
  }
  class RequiredIfCreatingValidator implements Validator {
    constructor(protected form: BossFormBase<any>) {

    }
    validate(c: AbstractControl): { [key: string]: any; } {
      if (this.form.isCreateNew) {
        return Validators.required(c);
      } else {
        return null;
      }
    }

  }
  export const RequiredIfCreating = new PlatformProvider(RequiredIfCreatingValidator, [BossFormBase]);


  export function sameAsAsync(comparePropertyName: string, comparePropertyNameDisplayName: string): PlatformProvider<SameAsAsyncAsyncValidator> {
    return new PlatformProvider({
      provide: SameAsAsyncAsyncValidator,
      useFactory: function (translate: TranslateService) {
        return new SameAsAsyncAsyncValidator(translate, comparePropertyName, comparePropertyNameDisplayName)
      },
      deps: [TranslateService]
    })
  }
  class SameAsAsyncAsyncValidator implements AsyncValidator {
    constructor(protected translate: TranslateService, protected comparePropertyName: string, protected comparePropertyNameDisplayName: string) {

    }
    protected isNull(value) {
      return value === null || value === undefined;
    }
    validate(control: AbstractControl) {
      const promise = new Promise(resolve => {
        if (control && control.root) {
          const compareWith = control.root.get(this.comparePropertyName);
          if (compareWith) {
            if (compareWith.value === control.value || (this.isNull(compareWith.valid) && this.isNull(control.value))) {
              resolve(null);
            } else {
              this.translate.get(this.comparePropertyNameDisplayName || this.comparePropertyName).first().subscribe(text => {
                resolve({ sameAs: { valid: false, compareWith: text } });
              })
            }
          }
        }
        resolve(null);
      });
      return promise;

    }
  }
}
