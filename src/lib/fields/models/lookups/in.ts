import { FieldLookup } from './base';

export class InFieldLookup extends FieldLookup {
  public lookup = 'in';
  public verboseName = 'One of';
  public icon = 'one_of';

  str(field: string, value: string, exclude: boolean): string {
    if (exclude) {
      return `${field} is not one of ${value}`;
    } else {
      return `${field} is one of ${value}`;
    }
  }
}
