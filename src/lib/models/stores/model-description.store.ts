import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Injectable } from '@app/core';
import { SingletonStore } from '@app/shared/stores/singleton.store';
import { ProjectsStore } from '@app/projects/stores/projects.store';

import { ModelDescriptionService } from '../services/model-description/model-description.service';
import { ModelDescription } from '../models/model-description';

@Injectable
export class ModelDescriptionStore extends SingletonStore<ModelDescription[]> {

  constructor(private modelDescriptionService: ModelDescriptionService,
              private projectsStore: ProjectsStore) {
    super();
  }

  protected fetch(): Observable<ModelDescription[]> {
    return this.projectsStore.getFirst()
      .pipe(switchMap(() => {
        if (!this.projectsStore.current) {
          return of([]);
        }

        return this.modelDescriptionService.get(this.projectsStore.current.uniqueName);
      }));
  }

  public getDetail(model, forceUpdate = false): Observable<ModelDescription> {
    return this.get(forceUpdate)
      .pipe(map(results => results.find(item => item.model == model)));
  }

  public getDetailFirst(model, forceUpdate = false): Observable<ModelDescription> {
    return this.getFirst(forceUpdate)
      .pipe(map(results => results.find(item => item.model == model)));
  }
}
