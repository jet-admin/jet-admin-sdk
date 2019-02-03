import * as _ from 'lodash';

export interface HttpParamsOptions {

  fromString?: string;
  fromObject?: {
    [param: string]: string | string[];
  };
}

export class HttpParams {

  private params = {};

  constructor(options?: HttpParamsOptions) {
    if (options.fromString) {
      options.fromString
        .split('&')
        .map(item => item.split(',', 2))
        .forEach(([key, value]) => {
          if (this.params[key] == undefined) {
            this.params[key] = value;
          } if (this.params[key] instanceof Array) {
            this.params[key].push(value);
          } else {
            this.params[key] = [this.params[key], value];
          }
        })
    }

    if (options.fromObject) {
      _.toPairs(options.fromObject)
        .forEach(([key, value]) => {
          this.params[key] = value;
        })
    }
  }

  public toString(): string {
    return _(this.params)
      .toPairs()
      .map(([key, value]) => {
        if (value instanceof Array) {
          return value.map(v => [key, v])
        } else {
          return [key, value]
        }
      })
      .flatten()
      .map(([key, value]) => {
        return [key, '=', value].join();
      })
      .value()
      .join('&');
  }

  public toObject() {
    return _.clone(this.params);
  }
}
