import * as _ from 'lodash';

import { Injector } from '../../core/services/injector/injector.service';
import { Factory } from '../../shared/services/factory/factory.service';
import { ModelDescriptionStore } from '../stores/model-description.store';
import { ModelDescription } from './model-description';

export class Model {

  private __factory__: Factory;
  private __modelDescriptionStore__: ModelDescriptionStore;
  private __modelDescription__: ModelDescription;

  public __primary_key__: number;
  public __db_str__: string;
  public __previous_sibling__: Model;
  public __next_sibling__: Model;

  public __model__: string;
  public __fields__: string[] = [];

  constructor(private injector: Injector) {
    this.__factory__ = this.injector.get<Factory>(Factory);
    this.__modelDescriptionStore__ = this.injector.get<ModelDescriptionStore>(ModelDescriptionStore);
  }

  deserialize(model: string, data: Object): Model {
    this.__model__ = model;

    if (data['__str__'] != undefined) {
      this.__db_str__ = data['__str__'];
      delete data['__str__'];
    }

    _.keys(data).forEach(key => {
      this[key] = data[key];
      this.__fields__.push(key);
    });

    if (data['__previous_sibling__']) {
      this.__previous_sibling__ = this.__factory__.create<Model>(Model).deserialize(this.__model__, data['__previous_sibling__']);
    }

    if (data['__next_sibling__']) {
      this.__next_sibling__ = this.__factory__.create<Model>(Model).deserialize(this.__model__, data['__next_sibling__']);
    }

    this.__modelDescriptionStore__.getDetail(model).subscribe(modelDescription => {
      let idField, firstField;

      this.__modelDescription__ = modelDescription;

      if (modelDescription && modelDescription.primaryKeyField) {
        this.__primary_key__ = this[modelDescription.primaryKeyField];
      } else if (idField = this.__fields__.find(item => item.toLowerCase() == 'id')) {
        this.__primary_key__ = this[idField];
      } else if (firstField = this.__fields__[0]) {
        this.__primary_key__ = this[firstField];
      }
    });

    return this;
  }

  serialize(fields?: string[]): Object {
    let data: Object = _.fromPairs(this.__fields__.map(field => [field, this[field]]));
    if (fields) {
      data = <Object>_.pickBy(data, (v, k) => fields.indexOf(k) != -1);
    }
    return data;
  }

  getLink() {
    return ['/app', window['project'], 'models', this.__model__, this.__primary_key__];
  }

  get __str__() {
    if (!this.__modelDescription__ || !this.__modelDescription__.displayField || this[this.__modelDescription__.displayField] == undefined) {
      if (this.__db_str__) {
        return this.__db_str__;
      } else {
        return `ID: ${this.__primary_key__}`;
      }
    }

    return this[this.__modelDescription__.displayField];
  }
}
