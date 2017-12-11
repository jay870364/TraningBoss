
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({ name: 'errorMessage', pure: false })
export class ErrorMessagePipe implements PipeTransform {
  private errorMessage = '';
  constructor(protected translate: TranslateService) {

  }
  transform(errors: ValidationErrors): string {
    if (errors) {
      const errorKeys = Object.keys(errors);
      if (errorKeys.length) {
        const key = errorKeys[0];
        const errorKey = `FormErrors.${key}`;
        const errorInfo = errors[key];
        this.translate.get(errorKey, errorInfo).subscribe(e => {
          this.errorMessage = e;
        })
      } else {
        this.errorMessage = '';
      }
      return this.errorMessage;
    } else {
      return '';
    }
  }
}
