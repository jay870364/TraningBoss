import { IBossListModel } from '../../decorator/list/BossListModel';
import { IBossApiModel } from '@boss/decorator/BossApiModel';
export class BossListMetadataHelper {
  public getSelectProperties(modelType: constructorof<any>): string[] {
    const meta = modelType as any as IBossListModel<any>;
    if (!meta || !meta.bossListMetadata) {
      throw Error(`no metadata for ${modelType.name}`);
    }
    let select = Object.keys(meta.bossListMetadata).map(k => meta.bossListMetadata[k]).filter(x => x).map(x => x.field);
    const apiModel = modelType as any as IBossApiModel;
    if (apiModel.apiModel && apiModel.apiModel.identityProperty) {
      select = select.concat([apiModel.apiModel.identityProperty]);
    }
    return select;
  }
}
