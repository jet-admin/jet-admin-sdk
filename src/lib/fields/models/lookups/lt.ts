import { FieldLookup } from './base';

export class LtFieldLookup extends FieldLookup {
  public lookup = 'lt';
  public verboseName = 'Less than';
  public icon = 'less_than';

  str(field: string, value: string, exclude: boolean): string {
    if (exclude) {
      return `${field} not less than ${value}`;
    } else {
      return `${field} less than ${value}`;
    }
  }
}
