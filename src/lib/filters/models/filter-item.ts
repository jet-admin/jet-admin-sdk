import { FieldLookup } from '@app/fields/models/lookups/base';
import { lookups } from '@app/fields/models/lookups';

export class FilterItem {

  field: string;
  lookup: FieldLookup;
  value: any;
  exclude: boolean;

  deserialize(data: Object): FilterItem {
    this.field = data['field'];
    this.lookup = lookups.find(item => item.lookup == data['lookup']);
    this.value = data['value'];
    this.exclude = data['exclude'];

    return this;
  }

  serialize(): Object {
    return {
      field: this.field,
      lookup: this.lookup.lookup,
      value: this.value,
      exclude: this.exclude
    };
  }

  get paramName() {
    const parts = [];

    if (this.exclude) {
      parts.push('exclude');
    }

    parts.push(this.field);

    if (this.lookup && this.lookup.lookup) {
      parts.push(this.lookup.lookup);
    }

    return parts.join('__');
  }

  str(fieldLabel?: string): string {
    return this.lookup.str(fieldLabel || this.field, this.value, this.exclude);
  }
}
