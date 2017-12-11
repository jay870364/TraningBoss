import { AccountSystemRef } from './AccountSystemRef';
export class ComponentData {
  public static accountSystemSelector = {
    modelType: AccountSystemRef,
    displayFormatter: (model: AccountSystemRef) => {
      if ('AccountSystem' in model) {
        model = model['AccountSystem']
      }
      return `${model.Owner.Name} - ${model.System.Name}`;
    }

  }
}
