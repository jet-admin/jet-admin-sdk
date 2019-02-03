import { FieldLookup } from './base';

export class LteFieldLookup extends FieldLookup {
  public lookup = 'lte';
  public verboseName = 'Less than or equals';
  public icon = 'less_than_or_equals';

  str(field: string, value: string, exclude: boolean): string {
    if (exclude) {
      return `${field} not less than or equals ${value}`;
    } else {
      return `${field} less than or equals ${value}`;
    }
  }
}
