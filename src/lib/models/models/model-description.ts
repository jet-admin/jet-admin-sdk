import { Segment } from '@app/filters/models/segment';

import { ModelDescriptionField } from './model-description-field';
import { ModelDescriptionRelation } from './model-description-relation';
import { ModelDescriptionAction } from './model-description-action';
import { ModelFlexField } from './model-flex-field';

export const SEGMENT_PARAM = '_segment';

export class ModelDescription {
  public project: string;
  public model: string;
  public verboseName: string;
  public verboseNamePlural: string;
  public dbTable: string;
  public hidden: boolean;
  public orderingField: string;
  public defaultOrderBy: string;
  public displayField: string;
  public primaryKeyField: string;
  public fields: ModelDescriptionField[] = [];
  public flexFields: ModelFlexField[] = [];
  public segments: Segment[] = [];
  public relations: ModelDescriptionRelation[] = [];
  public actions: ModelDescriptionAction[] = [];

  deserialize(data: Object): ModelDescription {
    this.project = data['project'];
    this.model = data['model'];
    this.verboseName = data['verbose_name'];
    this.verboseNamePlural = data['verbose_name_plural'];
    this.dbTable = data['db_table'];
    this.hidden = data['hidden'];
    this.orderingField = data['ordering_field'];
    this.defaultOrderBy = data['default_order_by'];
    this.displayField = data['display_field'];
    this.primaryKeyField = data['primary_key_field'];

    if (this.verboseName == undefined) {
      this.verboseName = this.model.replace(/_/g, ' ');
    }

    if (this.verboseNamePlural == undefined) {
      this.verboseNamePlural = this.verboseName;
    }

    if (data['fields']) {
      this.fields = data['fields'].map(item => new ModelDescriptionField().deserialize(item));
    }

    if (data['flex_fields']) {
      this.flexFields = data['flex_fields'].map(item => new ModelFlexField().deserialize(item));
    }

    if (data['segments']) {
      this.segments = data['segments'].map(item => new Segment().deserialize(item));
    }

    if (data['relations']) {
      this.relations = data['relations'].map(item => new ModelDescriptionRelation().deserialize(item));
    }

    if (data['actions']) {
      this.actions = data['actions'].map(item => new ModelDescriptionAction().deserialize(item));
    }

    if (!this.primaryKeyField) {
      let idField, firstField;

      if (idField = this.fields.find(item => item.name.toLowerCase() == 'id')) {
        this.primaryKeyField = idField.name;
      } else if (firstField = this.fields[0]) {
        this.primaryKeyField = firstField.name;
      }
    }

    return this;
  }

  serialize(): Object {
    return {
      project: this.project,
      model: this.model,
      verbose_name: this.verboseName,
      verbose_name_plural: this.verboseNamePlural,
      db_table: this.dbTable,
      hidden: this.hidden,
      fields: this.fields.map(item => item.serialize()),
      flex_fields: this.flexFields.map(item => item.serialize()),
      segments: this.segments.map(item => item.serialize()),
      ordering_field: this.orderingField,
      default_order_by: this.defaultOrderBy,
      display_field: this.displayField,
      primary_key_field: this.primaryKeyField,
      relations: this.relations.map(item => item.serialize()),
      actions: this.actions.map(item => item.serialize())
    };
  }

  get link() {
    return ['/app', window['project'], 'models', this.model];
  }

  get createLink() {
    return ['/app', window['project'], 'models', this.model, 'create'];
  }

  get systemSettingsLink() {
    return this.systemSettingsTabLink();
  }

  systemSettingsTabLink(tab?: string) {
    const link = ['/app', window['project'], 'models_edit', this.model];

    if (tab) {
      link.push(tab);
    }

    return link;
  }

  get deleteLink() {
    return ['/app', window['project'], 'models', this.model, 'delete'];
  }

  field(name: string) {
    return this.fields.find(item => item.name == name);
  }

  fieldsWithName(...names: string[]) {
    return this.fields.filter(item => names.indexOf(item.name) != -1);
  }

  fieldsWithNames(names: string[]) {
    return this.fields.filter(item => names.indexOf(item.name) != -1);
  }

  relation(name: string) {
    return this.relations.find(item => item.name == name);
  }

  relationsWithName(...names: string[]) {
    return this.relations.filter(item => names.indexOf(item.name) != -1);
  }

  get displayFields() {
    return this.fields.filter(item => item.name.toLowerCase() != 'id');
  }

  sublinks(all = false) {
    return this.segments
      .filter(item => all || item.visible)
      .map(item => {
        const params = {};
        params[SEGMENT_PARAM] = item.label;

        return {
          title: item.label,
          link: this.link,
          queryParams: params
        };
      });
  }
}
