import { ModelDescription } from './model-description';

export enum ModelDescriptionRelationField {
  OneToOneRel = 'OneToOneRel',
  OneToOneField = 'OneToOneField',
  ManyToOneRel = 'ManyToOneRel',
  ManyToManyField = 'ManyToManyField',
  ManyToManyRel = 'ManyToManyRel'
}

export class ModelDescriptionRelation {
  public name: string;
  public verboseName: string;
  public field: ModelDescriptionRelationField;
  public relatedModelField: string;
  public relatedModel: ModelDescription;
  public through: ModelDescription;

  deserialize(data: Object): ModelDescriptionRelation {
    this.name = data['name'];
    this.verboseName = data['verbose_name'];
    this.field = data['field'];
    this.relatedModelField = data['related_model_field'];

    if (this.verboseName == undefined) {
      this.verboseName = this.name.replace(/_/g, ' ');
    }

    if (data['related_model']) {
      this.relatedModel = new ModelDescription().deserialize(data['related_model']);
    }

    if (data['through']) {
      this.through = new ModelDescription().deserialize(data['through']);
    }

    return this;
  }

  serialize(): Object {
    return {
      name: this.name,
      verbose_name: this.verboseName,
      field: this.field,
      related_model_field: this.relatedModelField,
      related_model: this.relatedModel ? this.relatedModel.serialize() : undefined,
      through: this.through ? this.through.serialize() : undefined,
    };
  }

  get isM2M() {
    return [
      ModelDescriptionRelationField.ManyToManyRel,
      ModelDescriptionRelationField.ManyToManyField
    ].find(item => item == this.field);
  }
}
