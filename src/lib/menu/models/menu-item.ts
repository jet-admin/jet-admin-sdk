import { MenuItemType } from './menu-item-type';

export class MenuItem {

  public id: number;
  public type: MenuItemType;
  public params: Object;

  deserialize(data: Object): MenuItem {
    this.id = data['id'];
    this.type = data['type'];
    // this.params = JSON.parse(data['params']);
    this.params = data['params'];

    return this;
  }

  serialize(): Object {
    return {
      id: this.id,
      type: this.type,
      // params: JSON.stringify(this.params)
      params: this.params
    };
  }
}
