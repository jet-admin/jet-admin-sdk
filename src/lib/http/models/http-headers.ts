import * as _ from 'lodash';

export class HttpHeaders {

  private headers = {};

  public set(name: string, value: string | string[]): HttpHeaders {
    this.headers[name] = value;
    return this;
  }

  public toObject() {
    return _.clone(this.headers);
  }
}
