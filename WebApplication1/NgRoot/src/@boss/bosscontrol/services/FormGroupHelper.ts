import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class FormGroupHelper {
  public createQueryParams(model: any, lock: boolean) {
    const queryParams = {};
    Object.keys(model).forEach(k => {
      queryParams['$' + k] = model[k];
    })
    if (lock) {
      queryParams['$$lock'] = true;
    }
    return queryParams;
  }
  public extractModelFromQueryParams(formGroup: FormGroup, queryParams: { [key: string]: string }) {
    const model = {};
    Object.keys(queryParams).filter(x => x.startsWith('$') && x.substring(1) in formGroup.controls).forEach(key => {
      model[key.substring(1)] = queryParams[key];
    });
    return model;
  }
  public setStatusFromQueryParams(formGroup: FormGroup, queryParams: { [key: string]: string }) {
    if (formGroup) {
      Object.keys(formGroup.controls).forEach(key => {
        const ctrl = formGroup.get(key);
        const queryKey = '$' + key;
        if (ctrl) {
          if (queryParams['$$lock'] && queryKey in queryParams) {
            ctrl.disable();
          } else {
            ctrl.enable();
          }
        }
      });
    }
  }
  public setValueStateFromQueryParams(formGroup: FormGroup, queryParams: { [key: string]: string }) {
    if (formGroup) {
      Object.keys(formGroup.controls).forEach(key => {
        const ctrl = formGroup.get(key);
        const queryKey = '$' + key;
        if (ctrl && queryKey in queryParams) {
          ctrl.setValue(queryParams[queryKey]);
        }
      });
      this.setStatusFromQueryParams(formGroup, queryParams);
    }
  }
}
