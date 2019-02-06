import { Observable } from 'rxjs';
import { map, publishLast, refCount, switchMap } from 'rxjs/operators';

import { Injectable } from '../../../core/decorators/injectable/injectable';
import { HttpClient } from '../../../http';
import { ProjectsStore } from '../../../projects/stores/projects.store';

import { ApiService } from '../../../api/services/api/api.service';

@Injectable
export class AuthService {

  constructor(private http: HttpClient,
              private projectsStore: ProjectsStore,
              private apiService: ApiService) { }

  login(username: string, password: string): Observable<string> {
    const url = this.apiService.methodURL('token/');
    const data = {
      username: username,
      password: password
    };

    return this.http.post(url, data).pipe(
      switchMap(result => {
        this.apiService.saveToken(result['token']);
        return this.projectsStore.getFirst(true);
      }),
      map(() => true),
      this.apiService.catchApiError(false),
      publishLast(),
      refCount()
    );
  }

  logout() {
    this.apiService.deleteToken();
    this.apiService.deleteProjectToken();
    this.projectsStore.getFirst(true);
  }

  tokenLogin(token: string) {
    this.apiService.saveToken(token);
    return this.projectsStore.getFirst(true).pipe(map(() => true));
  }

  isAuthorized(): Observable<boolean> {
    return this.projectsStore.getFirst().pipe(map(items => items !== undefined));
  }

  isUserAuthorized(): Observable<boolean> {
    return this.isAuthorized().pipe(map(authorized => authorized && this.apiService.isUserToken()));
  }

  isProjectAuthorized(): Observable<boolean> {
    return this.isAuthorized().pipe(map(authorized => authorized && this.apiService.isProjectToken()));
  }
}
