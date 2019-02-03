import { Observable } from 'rxjs';
import { map, publishLast, refCount } from 'rxjs/operators';

import { HttpClient } from '@app/http';
import { Injectable } from '@app/core';

import { ApiInfo } from '../../models/api-info';

@Injectable
export class ApiInfoService {

  constructor(private http: HttpClient) {
  }

  get(apiUrl): Observable<ApiInfo> {
    return this.http.get<Array<Object>>(apiUrl).pipe(
      map(result => new ApiInfo().deserialize(result)),
      publishLast(),
      refCount()
    );
  }
}
