import { Observable } from 'rxjs';

import { Injectable } from '@app/core';
import { SingletonStore } from '@app/shared/stores/singleton.store';

import { UserService } from '../services/user/user.service';
import { User } from '../models/user';

@Injectable
export class CurrentUserStore extends SingletonStore<User> {

  constructor(private userService: UserService) {
    super();
    this.get();
  }

  protected fetch(): Observable<User> {
    return this.userService.getCurrent();
  }

  public update(fields: string[]) {
    return this.userService.update(this.instance, fields);
  }
}
