
export class ModelAction {

  public model: string;
  public forInstance = false;
  public bulk = false;

  deserialize(data: Object): ModelAction {
    this.model = data['model'];
    this.forInstance = data['for_instance'];
    this.bulk = data['bulk'];

    return this;
  }
}

export class ActionDescription {

  public name: string;
  public icon: string;
  public modelAction: ModelAction;

  deserialize(data: Object): ActionDescription {
    this.name = data['name'];
    this.icon = data['icon'];

    if (data['model_action']) {
      this.modelAction = new ModelAction().deserialize(data['model_action']);
    }

    return this;
  }

  link() {
    if (this.modelAction) {
      return ['/app', window['project'], 'models', this.modelAction.model, 'instance_action', this.name];
    }
  }
}
