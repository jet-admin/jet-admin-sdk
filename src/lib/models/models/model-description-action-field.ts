import { ModelDescription } from './model-description';

export class ModelDescriptionActionField {
  public name: string;
  public verboseName: string;
  public field: string;
  public relatedModel: ModelDescription;

  deserialize(data: Object): ModelDescriptionActionField {
    this.name = data['name'];
    this.verboseName = data['verbose_name'];
    this.field = data['field'];

    if (data['related_model']) {
      this.relatedModel = new ModelDescription().deserialize(data['related_model']);
    }

    return this;
  }

  serialize(): Object {
    return {
      name: this.name,
      verbose_name: this.verboseName,
      field: this.field,
      related_model: this.relatedModel.serialize()
    };
  }
}
