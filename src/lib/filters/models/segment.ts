import { FilterItem } from './filter-item';

export class Segment {

  public label: string;
  public filterItems: FilterItem[] = [];
  public visible: boolean;

  deserialize(data: Object): Segment {
    this.label = data['label'];
    this.visible = data['visible'];

    if (data['filter_items']) {
      this.filterItems = data['filter_items'].map(item => new FilterItem().deserialize(item));
    }

    return this;
  }

  serialize(): Object {
    return {
      label: this.label,
      filter_items: this.filterItems.map(item => item.serialize()),
      visible: this.visible
    };
  }
}
