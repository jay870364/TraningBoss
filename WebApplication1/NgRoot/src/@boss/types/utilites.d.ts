interface constructorof<T> {
  new(...any): T;
}
interface IApiModel<T> extends constructorof<T> {
  apiModel: {
    path: string
  }
}
interface IKeyValuePair<TValue> {
  [key: string]: TValue
}
type PropertyExpression<T> = (x: T) => any;
