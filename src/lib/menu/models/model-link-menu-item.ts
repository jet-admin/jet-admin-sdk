import { MenuItem } from './menu-item';

export class ModelLinkMenuItem extends MenuItem {

  public icon: string;
  public title: string;
  public model: string;

  deserialize(data: Object): ModelLinkMenuItem {
    super.deserialize(data);
    this.icon = this.params['icon'];
    this.title = this.params['title'];
    this.model = this.params['model'];
    return this;
  }

  serialize(): Object {
    const data = super.serialize();
    data['params']['icon'] = this.icon;
    data['params']['title'] = this.title;
    data['params']['model'] = this.model;
    return data;
  }

  get displayIcon() {
    if (this.icon) {
      return this.icon;
    }
  }
}
