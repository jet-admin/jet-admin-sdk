import { HttpClient, HttpHeaders, HttpParams } from '@app/http';
import { Observable, throwError } from 'rxjs';
import { map, publishLast, refCount, catchError } from 'rxjs/operators';

import { Injectable } from '@app/core';
import { ApiService } from '@app/api/services/api/api.service';
import { ServerRequestError } from '@app/api/utils/server-request-error/server-request-error';
import { StorageService } from '@app/core/services/storage/storage.service';

import { Project } from '../../models/project';

@Injectable
export class ProjectService {

  constructor(private http: HttpClient,
              private storageService: StorageService,
              private apiService: ApiService) { }

  get(params = {}): Observable<ProjectService.GetResponse> {
    const url = this.apiService.methodURL('projects/');
    let headers = new HttpHeaders();
    const httpParams = new HttpParams({ fromObject: params });

    headers = this.apiService.setHeadersToken(headers);

    return this.http.get<Array<Object>>(url, { headers: headers, params: httpParams }).pipe(
      map(result => new ProjectService.GetResponse().deserialize(result)),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }

  create(project: Project, token: string, demo?: string): Observable<Project> {
    const url = this.apiService.methodURL('projects/');
    let headers = new HttpHeaders();
    const data = project.serialize();

    data['token'] = token;

    if (demo != undefined) {
      data['demo'] = true;

      if (demo != '') {
        data['demo_project_name'] = demo;
      }
    }

    headers = this.apiService.setHeadersToken(headers);

    return this.http.post(url, data, { headers: headers }).pipe(
      map(result => new Project().deserialize(result)),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }

  update(project: Project, fields: string[]): Observable<Project> {
    const url = this.apiService.methodURL(`projects/${project.uniqueName}/`);
    let headers = new HttpHeaders();

    headers = this.apiService.setHeadersToken(headers);

    return this.http.patch(url, project.serialize(fields), { headers: headers }).pipe(
      map(result => new Project().deserialize(result)),
      this.apiService.catchApiError(false),
      publishLast(),
      refCount()
    );
  }

  updateLogo(project: Project, file: File): Observable<Project> {
    const url = this.apiService.methodURL(`projects/${project.uniqueName}/`);
    let headers = new HttpHeaders();
    let data: any;

    if (file) {
      data = new FormData();
      data.append('logo', file);
    } else {
      data = {
        logo: null
      };
    }

    headers = this.apiService.setHeadersToken(headers);

    return this.http.patch(url, data, { headers: headers }).pipe(
      map(result => new Project().deserialize(result)),
      this.apiService.catchApiError(false),
      publishLast(),
      refCount()
    );
  }

  createProjectToken(): Observable<string> {
    const url = this.apiService.methodURL('project_tokens/');

    return this.http.post(url, {}).pipe(
      map(result => result['token']),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }

  checkProjectApi(apiBaseUrl): Observable<boolean> {
    return this.http.get(apiBaseUrl).pipe(
      map(result => {
        if (result['version'] == undefined) {
          throwError(false);
          return;
        }

        return true;
      }),

      catchError(() => {
        return throwError(new ServerRequestError({
          non_field_errors: undefined,
          api_base_url: ['Project API is not reachable. Is it running? If so, you might have a CORS configuration issue.']
        }));
      }),
      publishLast(),
      refCount()
    );
  }

  copySettings(project: Project, sourceProject: Project): Observable<boolean> {
    const url = this.apiService.methodURL(`projects/${project.uniqueName}/copy_settings/`);
    let headers = new HttpHeaders();
    const data = {
      source_project: sourceProject.uniqueName
    };

    headers = this.apiService.setHeadersToken(headers);

    return this.http.post(url, data, { headers: headers }).pipe(
      map(result => true),
      this.apiService.catchApiError(false),
      publishLast(),
      refCount()
    );
  }

  resetSettings(project: Project, reset = 'all'): Observable<boolean> {
    const url = this.apiService.methodURL(`projects/${project.uniqueName}/reset_settings/`);
    let headers = new HttpHeaders();

    headers = this.apiService.setHeadersToken(headers);

    return this.http.post(url, { reset: reset }, { headers: headers }).pipe(
      map(result => true),
      this.apiService.catchApiError(false),
      publishLast(),
      refCount()
    );
  }

  getProjectsLastUsed() {
    try {
      return JSON.parse(this.storageService.get('projects_last_used')) || {};
    } catch (e) {
      return {};
    }
  }

  updateProjectLastUsed(project: Project) {
    const lastUsed = this.getProjectsLastUsed();
    lastUsed[project.uniqueName] = new Date().toISOString();
    this.storageService.set('projects_last_used', JSON.stringify(lastUsed));
  }

  sortProjectsLastUsed(projects: Project[]) {
    const lastUsed = this.getProjectsLastUsed();

    return projects.sort((lhs, rhs) => {
      if (lastUsed[lhs.uniqueName] == undefined && lastUsed[rhs.uniqueName] == undefined) {
        return 0;
      } else if (lastUsed[lhs.uniqueName] == undefined) {
        return 1;
      } else if (lastUsed[rhs.uniqueName] == undefined) {
        return -1;
      } else {
        return new Date(lastUsed[rhs.uniqueName]).getTime() - new Date(lastUsed[lhs.uniqueName]).getTime();
      }
    });
  }
}

export namespace ProjectService {

  export class GetResponse {
    public results: Project[];
    public next: string;
    public previous: string;
    public count: number;

    deserialize(data: Object) {
      this.results = data['results'].map(item => new Project().deserialize(item));
      this.next = data['next'];
      this.previous = data['previous'];
      this.count = data['count'];

      return this;
    }
  }
}
