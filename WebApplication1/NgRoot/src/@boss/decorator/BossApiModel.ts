import { Property } from './Property';
export interface IBossApiModel {
  apiModel: {
    path?: string,
    identityProperty?: string,
    expand: string[],
    select: string[]
  }
}
function getOrApplyApiModel(target: Object | Function): IBossApiModel {
  const tar: IBossApiModel = (typeof target === 'object' ? target.constructor : target) as any;
  if (!('apiModel' in tar)) {
    tar.apiModel = {
      select: [],
      expand: []
    };
  }
  return tar;
}
export function Key() {
  return function (target: Object, propertyKey: string) {
    Property()(target, propertyKey);
    const obj = getOrApplyApiModel(target);
    obj.apiModel.identityProperty = propertyKey;
  }
}
export function Expand(select?: string) {
  return function (target: Object, propertyKey: string) {
    const obj = getOrApplyApiModel(target);
    let expand = propertyKey;
    if (select) {
      expand += `($select=${select})`;
    }
    obj.apiModel.expand.push(expand);
  }
}

export function Select(...path: string[]) {
  return function (target: Object, propertyKey: string) {
    const obj = getOrApplyApiModel(target);
    if (path.length) {
      path.map(x => propertyKey + '.' + x).forEach(x => obj.apiModel.select.push(x));
    } else {
      obj.apiModel.select.push(propertyKey);
    }
  }
}
export function BossApiModel(path: string) {
  return function ViewModel(target) {
    const obj = getOrApplyApiModel(target);
    obj.apiModel.path = path;
  }
}

