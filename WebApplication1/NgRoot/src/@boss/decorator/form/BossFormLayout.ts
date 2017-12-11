import { IBossFormMetadata } from '@boss/decorator/form/IBossFormMetadata';
import { IBossFormModel } from './BossFormModel';


export interface IBossFormSubLayout<T> {
  typeName: string;
  data: T;
}

export abstract class BaseLayout {
  checkAndGetMetadata(metadata: IKeyValuePair<IBossFormMetadata>, expr: PropertyExpression<any>) {
    const meta = expr(metadata);
    if (!meta) {
      console.error(`${expr.toString()} can't get metadata, missing BossFormControl decorator?`);
    }
    return meta;
  }
}

export interface IBossFormLayoutBuilder<TR> {
  getLayout(metadataMap: IKeyValuePair<IBossFormMetadata>): IBossFormSubLayout<TR>;
}

export class BossFormRowLayout<T> extends BaseLayout implements IBossFormLayoutBuilder<IBossFormMetadata[]> {
  public getLayout(metadataMap: IKeyValuePair<IBossFormMetadata>) {
    return {
      typeName: 'Array',
      data: this.columns.map(expr => this.checkAndGetMetadata(metadataMap, expr))
    }
  }
  constructor(protected columns: PropertyExpression<T>[]) {
    super();
  }
}
export type BossFormTabLayoutData = { tab: string, layout: IBossFormMetadata[][] }[];
export class BossFormTabLayout<T> extends BaseLayout implements IBossFormLayoutBuilder<BossFormTabLayoutData> {
  getLayout(metadataMap: IKeyValuePair<IBossFormMetadata>) {
    const result = {
      typeName: 'Tab',
      data: Object.keys(this.tabColumns).map(tab => {
        return { tab: tab, layout: this.tabColumns[tab].map(exprArr => exprArr.map(expr => this.checkAndGetMetadata(metadataMap, expr) as IBossFormMetadata)) };
      })
    };
    return result;
  }
  constructor(protected tabColumns: { [tabName: string]: PropertyExpression<T>[][] }) {
    super();
  }
}
