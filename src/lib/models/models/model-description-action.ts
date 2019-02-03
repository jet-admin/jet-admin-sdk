import { ModelDescriptionActionField } from './model-description-action-field';

export class ModelDescriptionAction {
  public name: string;
  public verboseName: string;
  public fields: ModelDescriptionActionField[] = [];

  deserialize(data: Object): ModelDescriptionAction {
    this.name = data['name'];
    this.verboseName = data['verbose_name'];

    if (data['fields']) {
      this.fields = data['fields'].map(item => new ModelDescriptionActionField().deserialize(item));
    }

    return this;
  }

  serialize(): Object {
    return {
      name: this.name,
      verbose_name: this.verboseName,
      fields: this.fields.map(item => item.serialize())
    };
  }

  link(model) {
    return ['/app', window['project'], 'models', model, 'action', this.name];
  }
}
