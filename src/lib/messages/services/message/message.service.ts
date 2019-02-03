import { Observable } from 'rxjs';
import { map, publishLast, refCount } from 'rxjs/operators';

import { Injectable } from '@app/core';
import { HttpClient, HttpHeaders } from '@app/http';
import { ProjectApiService } from '@app/api/services/project-api/project-api.service';

@Injectable
export class MessageService {

  constructor(private http: HttpClient,
              private apiService: ProjectApiService) { }

  send(name: string, params?: Object): Observable<Object | Object[]> {
    const url = this.apiService.methodURL('messages/');
    let headers = new HttpHeaders();
    const data = {
      name: name,
      params: params
    };

    headers = this.apiService.setHeadersToken(headers);

    return this.http.post<Object | Object[]>(url, data, { headers: headers }).pipe(
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }
}
