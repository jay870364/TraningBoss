import { Injector } from '@angular/core';
import { CustomButtons } from '@boss/platform/services/CustomButtons';
export function custombuttonsFactory(injector: Injector) {
  const service = new CustomButtons(injector);
  /*
  service.setButton([{text: 'TestCustomButtons',getPath: (entry, key) => `platform/test/${key}`}], 'MOXA_EDI', ['User']);
  */
  return service;
}
