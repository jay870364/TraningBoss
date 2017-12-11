export interface II18nModel {
  defaultNamesapce: string;
}
export function I18nNamespace<T>(defaultNamesapce: string) {
  return (target) => {
    (target as II18nModel).defaultNamesapce = defaultNamesapce;
  }
}
