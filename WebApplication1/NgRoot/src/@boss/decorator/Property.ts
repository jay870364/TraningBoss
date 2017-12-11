export function Property(alias?: string) {
  return function (target: Object, propertyKey: string) {
    if (!target.constructor['$$properties']) {
      target.constructor['$$properties'] = {};
    }
    if (!(propertyKey in target.constructor['$$properties'])) {
      target.constructor['$$properties'][propertyKey] = Reflect.getMetadata('design:type', target, propertyKey).name;
    }
    if (alias && !(alias in target.constructor['$$properties'])) {
      target.constructor['$$properties'][alias] = target.constructor['$$properties'][propertyKey];
    }
  }
}
