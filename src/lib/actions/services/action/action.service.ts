import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { Injectable } from '@app/core';
import { MessageService } from '@app/messages/services/message/message.service';

import { ActionDescription } from '../../models/action-description';

@Injectable
export class ActionService {

  constructor(private messageService: MessageService) { }

  get(): Observable<ActionDescription[]> {
    return this.messageService.send('get_action_list')
      .pipe(map(result => {
        if (result && _.isArray(result)) {
          return (result as Object[]).map(item => new ActionDescription().deserialize(item));
        }
      }));
  }

  executeModelInstance(
    model: string,
    name: string,
    id: number,
    params?: Object
  ): Observable<Object | Object[]> {
    const data = {
      model: model,
      name: name,
      id: id,
      params: params
    };
    return this.messageService.send('execute_action', data);
  }

  executeModelInstanceBulk(
    model: string,
    name: string,
    ids: number[],
    inverseIds: boolean,
    params?: Object
  ): Observable<Object | Object[]> {
    const data = {
      model: model,
      name: name,
      ids: ids,
      inverseIds: inverseIds,
      params: params
    };
    return this.messageService.send('execute_action', data);
  }
}
