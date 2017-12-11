export interface IMenuItem {
  title: string;
  child?: IMenuItem[];
  path?: string;
  click?: () => void;
  icon?: string;
}
