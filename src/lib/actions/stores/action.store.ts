import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@app/core';
import { SingletonStore } from '@app/shared/stores/singleton.store';

import { ActionService } from '../services/action/action.service';
import { ActionDescription } from '../models/action-description';

@Injectable
export class ActionStore extends SingletonStore<ActionDescription[]> {

  constructor(private actionService: ActionService) {
    super();
    this.get();
  }

  protected fetch(): Observable<ActionDescription[]> {
    return this.actionService.get().pipe(map(result => {
      if (!result) {
        return [];
      }

      return result;
    }));
  }

  getModel(model: string, forceUpdate = false) {
    return this.get(forceUpdate).pipe(map(result => {
      return result.filter(item => item.modelAction
      && item.modelAction.model == model
      && !item.modelAction.forInstance);
    }));
  }

  getModelAction(model: string, action: string, forceUpdate = false) {
    return this.getModel(model, forceUpdate).pipe(map(result => {
      return result.find(item => item.name == action);
    }));
  }

  getInstanceModel(model: string, forceUpdate = false) {
    return this.get(forceUpdate).pipe(map(result => {
      return result.filter(item => item.modelAction
      && item.modelAction.model == model
      && item.modelAction.forInstance);
    }));
  }

  getInstanceModelAction(model: string, action: string, forceUpdate = false) {
    return this.getInstanceModel(model, forceUpdate).pipe(map(result => {
      return result.find(item => item.name == action);
    }));
  }
}
