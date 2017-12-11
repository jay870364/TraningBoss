export type ValueFactory<T> = (...any: any[]) => T;
export type IValueOrFactory<T> = T | ValueFactory<T>;

export class ValueOrFactoryResolver<T> {

  protected _value: any;
  protected type: number;
  public getValue(...args: any[]) {
    return this.type === 2 ? this._value : (this._value as ValueFactory<T>).apply(this, args);
  }
  constructor(valueOrFactory: IValueOrFactory<T>) {
    this._value = valueOrFactory;
    if (typeof valueOrFactory === 'function') {
      this.type = 1;
    } else {
      this.type = 2
    }
  }
}
