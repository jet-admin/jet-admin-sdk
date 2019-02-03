
export abstract class FieldLookup {
  public lookup: string;
  public abstract verboseName: string;
  public icon: string;
  public symbol: string;

  abstract str(field: string, value: string, exclude: boolean): string;
}
