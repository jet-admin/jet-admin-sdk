import { FieldLookup } from './base';

export class GtFieldLookup extends FieldLookup {
  public lookup = 'gt';
  public verboseName = 'Greater than';
  public icon = 'greater_than';

  str(field: string, value: string, exclude: boolean): string {
    if (exclude) {
      return `${field} not greater than ${value}`;
    } else {
      return `${field} greater than ${value}`;
    }
  }
}
