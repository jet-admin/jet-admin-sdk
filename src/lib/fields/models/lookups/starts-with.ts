import { FieldLookup } from './base';

export class StartsWithFieldLookup extends FieldLookup {
  public lookup = 'istartswith';
  public verboseName = 'Starts With';
  public icon = 'starts_with';

  str(field: string, value: string, exclude: boolean): string {
    if (exclude) {
      return `${field} not starts with ${value}`;
    } else {
      return `${field} starts with ${value}`;
    }
  }
}
