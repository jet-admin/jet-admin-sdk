import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '../../../core/decorators/injectable/injectable';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '../../../http';
import { ProjectsStore } from '../../../projects/stores/projects.store';

import { ServerRequestError } from '../../utils/server-request-error/server-request-error';
import { ApiService } from '../api/api.service';

@Injectable
export class ProjectApiService {

  constructor(private apiService: ApiService,
              private projectsStore: ProjectsStore) { }

  public get apiBaseUrl() {
    if (!this.projectsStore.current) {
      return;
    }
    return `${this.projectsStore.current.apiBaseUrl}`;
  }

  public methodURL(method) {
    return `${this.apiBaseUrl}${method}`;
  }

  public modelUrl(model) {
    return `${this.apiBaseUrl}models/${model}/`;
  }

  public detailModelUrl(model, id) {
    return `${this.apiBaseUrl}models/${model}/${id}/`;
  }

  public actionUrl(model, action) {
    return `${this.apiBaseUrl}models/${model}/${action}/`;
  }

  public setHeadersToken(headers: HttpHeaders) {
    return this.apiService.setHeadersToken(headers);
  }

  public catchApiError(processAuthExpire = true) {
    return catchError(error => {
      if (processAuthExpire && error instanceof HttpErrorResponse && error.status == 401) {
        console.error(error);
      }

      const serverError = new ServerRequestError(error);

      return throwError(serverError);
    });
  }
}
