import { PlatformProvider } from './../../../PlatformProvider';
import { IListLoader } from '../ListLoader';
import { IListDeleter } from '../ListDeleter';
import { IHttpDataSource } from '@boss/services/datasource/IHttpDataSource';
import { BossGridSort } from '../../boss-grid/boss-grid.component';

export interface IBossListSettings<T> {
  loader?: PlatformProvider<IListLoader<T>>;
  deleter?: PlatformProvider<IListDeleter<T>>;
  autoSelect?: boolean;
  defaultActions?: boolean;
  defaultSortState?: BossGridSort[];
}
export interface IBossAutoListDeleteContext<T> {
  identity: any;
  model: T;
}

export interface IBossAutoListLoadContext<T> {
  datasource: IHttpDataSource<T>;
}
