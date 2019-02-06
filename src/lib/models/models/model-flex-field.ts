import { FormField } from '../../fields/models/form-field';

export class ModelFlexField {
  public name: string;
  public verboseName: string;
  public field: string;
  public query: string;
  public code: string;
  public params = {};

  private _formField: FormField;

  deserialize(data: Object): ModelFlexField {
    this.name = data['name'];
    this.verboseName = data['verbose_name'];
    this.field = data['field'];
    this.query = data['query'];
    this.code = data['code'];

    if (data['params']) {
      this.params = data['params'];
    }

    return this;
  }

  serialize(): Object {
    return {
      name: this.name,
      verbose_name: this.verboseName,
      field: this.field,
      query: this.query,
      code: this.code,
      params: this.params
    };
  }

  get formField(): FormField {
    if (!this._formField) {
      this._formField = new FormField().deserialize({
        name: this.name,
        label: this.verboseName,
        field: this.field,
        editable: false,
        params: { html: true }
      });
    }

    return this._formField;
  }
}
