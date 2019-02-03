import * as _ from 'lodash';

export enum CustomViewType {
  Common = 'common',
  ModelDescription = 'model_desc',
  Model = 'model',
  Widget = 'widget',
}

export class CustomView {

  public uniqueName: string;
  public name: string;
  public viewType: CustomViewType;
  public dist: File;
  public distBaseAbsoluteUrl: string;
  public params: Object;
  public dateAdd: string;

  deserialize(data: Object): CustomView {
    this.uniqueName = data['unique_name'];
    this.name = data['name'];
    this.viewType = data['view_type'];
    this.dist = data['dist'];
    this.distBaseAbsoluteUrl = data['dist_base_absolute_url'];
    this.params = JSON.parse(data['params']);
    this.dateAdd = data['date_add'];

    return this;
  }

  serialize(fields?: string[]): Object {
    let data: Object = {
      unique_name: this.uniqueName,
      name: this.name,
      view_type: this.viewType,
      dist: this.dist,
      params: JSON.stringify(this.params)
    };
    if (fields) {
      data = <Object>_.pickBy(data, (v, k) => fields.indexOf(k) != -1);
    }
    return data;
  }

  get link() {
    return ['/app', window['project'], 'flex', this.uniqueName];
  }

  get changeLink() {
    return ['/app', window['project'], 'flexviews_edit', this.uniqueName];
  }
}
