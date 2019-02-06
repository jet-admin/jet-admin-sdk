import { Observable } from 'rxjs';
import { map, publishLast, refCount } from 'rxjs/operators';

import { Injectable } from '../../../core/decorators/injectable/injectable';
import { HttpClient, HttpHeaders, HttpParams } from '../../../http';
import { ApiService } from '../../../api/services/api/api.service';

import { User } from '../../models/user';

@Injectable
export class UserService {

  constructor(private http: HttpClient,
              private apiService: ApiService) { }

  get(search: string): Observable<User[]> {
    const url = this.apiService.methodURL('users/');
    let headers = new HttpHeaders();
    const httpParams = new HttpParams({ fromObject: { search: search } });

    headers = this.apiService.setHeadersToken(headers);

    return this.http.get<Array<Object>>(url, { headers: headers, params: httpParams }).pipe(
      map(result => result.map(item => new User().deserialize(item))),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }

  getCurrent(params = {}): Observable<User> {
    const url = this.apiService.methodURL('current_user/');
    let headers = new HttpHeaders();

    headers = this.apiService.setHeadersToken(headers);

    return this.http.get<User>(url, { headers: headers, params: {} }).pipe(
      map(result => new User().deserialize(result)),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }

  create(user: User): Observable<User> {
    const url = this.apiService.methodURL('users/');

    return this.http.post(url, user.serialize()).pipe(
      map(result => new User().deserialize(result)),
      this.apiService.catchApiError(false),
      publishLast(),
      refCount()
    );
  }

  update(user: User, fields: string[]): Observable<User> {
    const url = this.apiService.methodURL('current_user/edit/');
    let headers = new HttpHeaders();

    headers = this.apiService.setHeadersToken(headers);

    return this.http.patch(url, user.serialize(fields), { headers: headers }).pipe(
      map(result => new User().deserialize(result)),
      this.apiService.catchApiError(false),
      publishLast(),
      refCount()
    );
  }

  updatePhoto(file: File): Observable<User> {
    const url = this.apiService.methodURL('current_user/edit/');
    let headers = new HttpHeaders();
    let data: any;

    if (file) {
      data = new FormData();
      data.append('photo', file);
    } else {
      data = {
        photo: null
      };
    }

    headers = this.apiService.setHeadersToken(headers);

    return this.http.patch(url, data, { headers: headers }).pipe(
      map(result => new User().deserialize(result)),
      this.apiService.catchApiError(false),
      publishLast(),
      refCount()
    );
  }

  restore(email: string): Observable<boolean> {
    const url = this.apiService.methodURL('users/restore/');
    const data = {
      email: email
    };

    return this.http.post(url, data).pipe(
      map(result => true),
      this.apiService.catchApiError(false),
      publishLast(),
      refCount()
    );
  }

  restoreComplete(code: string, password: string): Observable<UserService.RestoreCompleteResponse> {
    const url = this.apiService.methodURL('users/restore_complete/');
    const data = {
      validation_code: code,
      password: password
    };

    return this.http.post(url, data).pipe(
      map(result => new UserService.RestoreCompleteResponse().deserialize(result)),
      this.apiService.catchApiError(false),
      publishLast(),
      refCount()
    );
  }
}

export namespace UserService {

  export class RestoreCompleteResponse {
    public validationCode: string;
    public token: string;

    deserialize(data: Object) {
      this.validationCode = data['validation_code'];
      this.token = data['token'];

      return this;
    }
  }
}
