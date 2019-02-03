import { Observable } from 'rxjs';
import { map, publishLast, refCount } from 'rxjs/operators';

import { Injectable } from '@app/core';
import { HttpClient, HttpHeaders } from '@app/http';
import { ApiService } from '@app/api/services/api/api.service';

import { MenuSettings } from '../../models/menu-settings';

@Injectable
export class MenuSettingsService {

  constructor(private http: HttpClient,
              private apiService: ApiService) { }

  get(projectName: string): Observable<MenuSettings> {
    const url = this.apiService.projectMethodURL(projectName, 'menu_settings/');
    let headers = new HttpHeaders();
    const params = {};

    params['project'] = projectName;

    headers = this.apiService.setHeadersToken(headers);

    return this.http.get<Array<Object>>(url, { headers: headers, params: params }).pipe(
      map(result => result.length ? new MenuSettings().deserialize(result[0]) : undefined),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }

  create(projectName: string, instance: MenuSettings): Observable<MenuSettings> {
    const url = this.apiService.projectMethodURL(projectName, 'menu_settings/');
    let headers = new HttpHeaders();
    const params = {};

    params['project'] = projectName;

    headers = this.apiService.setHeadersToken(headers);

    return this.http.post(url, instance.serialize(), { headers: headers, params: params }).pipe(
      map(result => new MenuSettings().deserialize(result)),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }
}
