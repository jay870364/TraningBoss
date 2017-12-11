import { PlatformProvider } from './../../PlatformProvider';

import { ValueOrArray } from '../../ValueOrArray';
import { ValueOrArrayResolver } from '../../ValueOrArrayResolver';
import { IBossListModel } from './BossListModel';
import { IBossActionButton } from '../IBossActionButton';
import { IListLoader } from '../../bosscontrol/services/ListLoader';
import { IListDeleter } from '../../bosscontrol/services/ListDeleter';
import { BossGridSort } from '../../bosscontrol/boss-grid/boss-grid.component';
export interface IBossListOptions<T> {
  loader?: PlatformProvider<IListLoader<T>>;
  deleter?: PlatformProvider<IListDeleter<T>>;
  defaultActions?: boolean;
  actions?: PlatformProvider<IBossActionButton<T>>[];
  autoSelect?: boolean;
  defaultSortState?: BossGridSort[];
}
export function BossList<T>(options: IBossListOptions<T> = {}) {
  return (target) => {
    const tar = (<IBossListModel<T>>target);
    tar.bossListSettings = {
      loader: options.loader,
      deleter: options.deleter,
      autoSelect: options.autoSelect,
      defaultActions: options.defaultActions,
      defaultSortState: options.defaultSortState
    };
    tar.bossListActions = options.actions;
  }
}
