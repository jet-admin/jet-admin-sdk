import { MenuItem } from './menu-item';
import { menuItemsByType } from './menu-items';

export class MenuSettings {

  public project: string;
  public primaryItems: MenuItem[] = [];
  public secondaryItems: MenuItem[] = [];

  deserialize(data: Object): MenuSettings {
    this.project = data['project'];

    if (data['items']) {
      const items = JSON.parse(data['items']);

      if (items['primary_items']) {
        this.primaryItems = items['primary_items'].map(item => {
          const menuItem = menuItemsByType[item['type']];
          return new menuItem().deserialize(item);
        });
      }

      if (items['secondary_items']) {
        this.secondaryItems = items['secondary_items'].map(item => {
          const menuItem = menuItemsByType[item['type']];
          return new menuItem().deserialize(item);
        });
      }
    }

    return this;
  }

  serialize(): Object {
    return {
      project: this.project,
      items: JSON.stringify({
        primary_items: this.primaryItems,
        secondary_items: this.secondaryItems
      })
    };
  }
}
