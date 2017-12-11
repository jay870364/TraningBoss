export type LazyValueFactory<T> = () => T;
export class Lazy<T>{
  protected _value: T;
  protected inited = false;
  constructor(protected valueFactory: LazyValueFactory<T>) {

  }
  public reset(): void {
    this.inited = false;
  }
  public get value() {
    if (this.inited) {
      return this._value;
    } else {
      this.inited = true;
      this._value = this.valueFactory();

      return this._value;
    }
  }
}

export type AsyncLazyValueSetter<T> = (value: T) => void;
export type AsyncLazyValueFacotry<T> = (setvalue: AsyncLazyValueSetter<T>) => void;
export class AsyncLazy<T> {
  protected _value: T;
  protected inited = false;
  constructor(protected valueFactory: AsyncLazyValueFacotry<T>) {

  }
  public reset(): void {
    this.inited = false;
  }
  public async getValueAsync() {
    return this.inited ? this._value : await new Promise<T>((resolve) => {
      this.valueFactory(v => {
        resolve(v);
        this.inited = true;
      });
    }
    );
  }
}
