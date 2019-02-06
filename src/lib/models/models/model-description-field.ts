import { FormField } from '../../fields/models/form-field';

import { ModelDescription } from './model-description';

export class ModelDescriptionField {
  public name: string;
  public verboseName: string;
  public field: string;
  public editable: boolean;
  public isRelation: boolean;
  public filterable: boolean;
  public dbColumn: string;
  public params = {};
  // public fieldDescription: FieldDescription;
  private _formField: FormField;

  deserialize(data: Object): ModelDescriptionField {
    this.name = data['name'];
    this.verboseName = data['verbose_name'];
    this.field = data['field'];
    this.editable = data['editable'];
    this.isRelation = data['is_relation'];
    this.filterable = data['filterable'];
    this.dbColumn = data['db_column'];

    if (this.verboseName == undefined) {
      this.verboseName = this.name;

      if (this.field == 'ForeignKey' && this.verboseName.substr(-3) == '_id') {
        this.verboseName = this.verboseName.substr(0, this.verboseName.length - 3);
      }

      this.verboseName = this.verboseName.replace(/_/g, ' ');
    }

    if (data['params']) {
      this.params = data['params'];
    }

    // this.updateFieldDescription();

    return this;
  }

  serialize(): Object {
    return {
      name: this.name,
      verbose_name: this.verboseName,
      field: this.field,
      editable: this.editable,
      is_relation: this.isRelation,
      filterable: this.filterable,
      params: this.params
    };
  }

  get formField(): FormField {
    if (!this._formField) {
      this._formField = new FormField().deserialize({
        name: this.name,
        label: this.verboseName,
        field: this.field,
        params: this.params,
        editable: this.editable
      });
    }

    return this._formField;
  }

  // updateFieldDescription() {
  //   this.fieldDescription = getFieldDescriptionByType(this.field);
  // }

  // get lookups() {
  //   return this.fieldDescription.lookups;
  // }

  get relatedModel() {
    if (!this.params['related_model']) {
      return;
    }
    return new ModelDescription().deserialize(this.params['related_model']);
  }
}
