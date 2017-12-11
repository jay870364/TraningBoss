export interface IBossActionButton<T> {
  color?: string;
  text: string;
  visible: boolean;
  enabled: boolean;
  click($event: MouseEvent, entry: T, key): void;
}
export abstract class BossActionButton<T> implements IBossActionButton<T> {
  public abstract text: string;
  public visible= true;
  public enabled= true;
  public abstract click($event: MouseEvent, entry: T, key): void;
}
