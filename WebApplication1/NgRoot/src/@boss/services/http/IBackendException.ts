export interface IBackendException {
  ExceptionMessage: string;
  ExceptionType: string;
  Message: string;
  StackTrace: string;
  ModelState?: { [field: string]: string[] };
}
