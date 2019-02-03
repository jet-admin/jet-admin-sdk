import { FieldLookup } from './base';

export class IsNullFieldLookup extends FieldLookup {
  public lookup = 'isnull';
  public verboseName = 'Is Null';
  public icon = 'is_null';

  str(field: string, value: string, exclude: boolean): string {
    if (exclude) {
      return value ? `${field} not is null` : `${field} is null`;
    } else {
      return value ? `${field} is null` : `${field} is not null`;
    }
  }
}
