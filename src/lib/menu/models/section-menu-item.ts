import { MenuItem } from './menu-item';
import { menuItemsByType } from './menu-items';

export class SectionMenuItem extends MenuItem {

  public title: string;
  public children: MenuItem[] = [];

  deserialize(data: Object): SectionMenuItem {
    super.deserialize(data);
    this.title = this.params['title'];

    if (this.params && this.params['children']) {
      this.children = this.params['children'].map(item => {
        const menuItem = menuItemsByType[item['type']];
        return new menuItem().deserialize(item);
      });
    }

    return this;
  }

  serialize(): Object {
    const data = super.serialize();
    data['params']['title'] = this.title;
    data['params']['children'] = this.children.map(item => item.serialize());
    return data;
  }
}
