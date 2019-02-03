import { FieldLookup } from './base';

export class ExactFieldLookup extends FieldLookup {
  public verboseName = 'Equals';
  public icon = 'equals';

  str(field: string, value: string, exclude: boolean): string {
    if (exclude) {
      return `${field} is not ${value}`;
    } else {
      return `${field} is ${value}`;
    }
  }
}
