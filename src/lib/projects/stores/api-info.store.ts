import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Injectable } from '@app/core';
import { SingletonStore } from '@app/shared/stores/singleton.store';
import { ApiInfoService } from '@app/api/services/api-info/api-info.service';
import { ApiInfo } from '@app/api/models/api-info';

import { ProjectsStore } from './projects.store';

@Injectable
export class ApiInfoStore extends SingletonStore<ApiInfo> {

  constructor(private projectsStore: ProjectsStore,
              private apiInfoService: ApiInfoService) {
    super();
    this.get();
  }

  protected fetch(): Observable<ApiInfo> {
    return this.projectsStore.current$.pipe(switchMap(project => {
      if (!project) {
        return of(undefined);
      }

      return this.apiInfoService.get(project.apiBaseUrl);
    }));
  }
}
