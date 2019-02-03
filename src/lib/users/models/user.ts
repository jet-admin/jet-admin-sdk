import * as _ from 'lodash';

import { UserParams } from './user-params';

export class User {
  public id: number;
  public username: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public password: string;
  public photo: string;
  public params = new UserParams();

  deserialize(data: Object): User {
    this.id = data['id'];
    this.username = data['username'];
    this.email = data['email'];
    this.firstName = data['first_name'];
    this.lastName = data['last_name'];
    this.password = data['password'];
    this.photo = data['photo'];

    if (data['params']) {
      try {
        this.params = new UserParams().deserialize(JSON.parse(data['params']));
      } catch (e) { }
    }


    return this;
  }

  serialize(fields?: string[]): Object {
    let data: Object = {
      id: this.id,
      username: this.username,
      email: this.email,
      first_name: this.firstName,
      last_name: this.lastName,
      password: this.password,
      params: JSON.stringify(this.params.serialize())
    };
    if (fields) {
      data = <Object>_.pickBy(data, (v, k) => fields.indexOf(k) != -1);
    }
    return data;
  }
}
