import { FieldLookup } from './base';

export class EndsWithFieldLookup extends FieldLookup {
  public lookup = 'iendswith';
  public verboseName = 'Ends With';
  public icon = 'ends_with';

  str(field: string, value: string, exclude: boolean): string {
    if (exclude) {
      return `${field} not ends with ${value}`;
    } else {
      return `${field} ends with ${value}`;
    }
  }
}
