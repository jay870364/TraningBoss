export function trim(str: string) {
  if (str === undefined || str === null) {
    return str;
  }
  return str.replace(/^\s+|\s+$/, '');
}
