import { FieldLookup } from './base';

export class ContainsFieldLookup extends FieldLookup {
  public lookup = 'icontains';
  public verboseName = 'Contains';
  public icon = 'contains';

  str(field: string, value: string, exclude: boolean): string {
    if (exclude) {
      return `${field} not contains ${value}`;
    } else {
      return `${field} contains ${value}`;
    }
  }
}
