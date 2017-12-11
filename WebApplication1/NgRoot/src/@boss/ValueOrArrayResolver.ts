import { ValueOrArray } from './ValueOrArray';
export class ValueOrArrayResolver<T> {
  protected _value: T[];
  constructor(valueOrarray: ValueOrArray<T>) {
    this._value = valueOrarray ?
      (Array.isArray(valueOrarray) ?
        valueOrarray : [valueOrarray])
      : [];
  }
  public get array(): T[] {
    return this._value;
  }
  public get firstValue() {
    return this._value.length ? this._value[0] : undefined;
  }
}
