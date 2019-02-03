import { FieldLookup } from './base';

export class GteFieldLookup extends FieldLookup {
  public lookup = 'gte';
  public verboseName = 'Greater than or equals';
  public icon = 'greater_than_or_equals';

  str(field: string, value: string, exclude: boolean): string {
    if (exclude) {
      return `${field} not greater than or equals ${value}`;
    } else {
      return `${field} greater than or equals ${value}`;
    }
  }
}
