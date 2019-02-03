
export class FormField {
  name: string;
  label: string;
  field: string;
  params = {};
  editable: boolean;

  deserialize(data: Object): FormField {
    this.name = data['name'];
    this.label = data['label'];
    this.field = data['field'];
    this.editable = data['editable'] != false;

    if (data['params']) {
      this.params = data['params'];
    }

    return this;
  }

  serialize(): Object {
    return {
      name: this.name,
      label: this.label,
      field: this.field,
      params: this.params,
      editable: this.editable
    };
  }
}
