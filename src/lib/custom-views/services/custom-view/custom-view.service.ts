import { Observable} from 'rxjs';
import { map, publishLast, refCount } from 'rxjs/operators';
import * as _ from 'lodash';

import { Injectable } from '../../../core/decorators/injectable/injectable';
import { HttpClient, HttpHeaders, HttpParams } from '../../../http';
import { ApiService } from '../../../api/services/api/api.service';

import { CustomView } from '../../models/custom-view';

@Injectable
export class CustomViewService {

  constructor(private http: HttpClient,
              private apiService: ApiService) { }

  get(projectName: string, params = {}): Observable<CustomView[]> {
    const url = this.apiService.projectMethodURL(projectName, 'custom_views/');
    let headers = new HttpHeaders();
    const httpParams = new HttpParams({ fromObject: params });

    headers = this.apiService.setHeadersToken(headers);

    return this.http.get<Array<Object>>(url, { headers: headers, params: httpParams }).pipe(
      map(result => result.map(item => new CustomView().deserialize(item))),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }

  getDetail(projectName: string, id: number, params = {}): Observable<CustomView> {
    const url = this.apiService.projectMethodURL(projectName, `custom_views/${id}/`);
    let headers = new HttpHeaders();
    const httpParams = new HttpParams({ fromObject: params });

    headers = this.apiService.setHeadersToken(headers);

    return this.http.get<Array<Object>>(url, { headers: headers, params: httpParams }).pipe(
      map(result => new CustomView().deserialize(result)),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }

  create(projectName: string, instance: CustomView): Observable<CustomView> {
    const url = this.apiService.projectMethodURL(projectName, 'custom_views/');
    const formData = new FormData();
    const data = instance.serialize();
    let headers = new HttpHeaders();

    headers = this.apiService.setHeadersToken(headers);

    _.toPairs(data).forEach(([key, value]) => formData.append(key, value));

    return this.http.post(url, formData, { headers: headers }).pipe(
      map(result => new CustomView().deserialize(result)),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }

  update(projectName: string, instance: CustomView, fields?: string[]): Observable<CustomView> {
    const url = this.apiService.projectMethodURL(projectName, `custom_views/${instance.uniqueName}/`);
    const formData = new FormData();
    const data = instance.serialize(fields);
    let headers = new HttpHeaders();

    headers = this.apiService.setHeadersToken(headers);

    _.toPairs(data)
      .filter(([key, value]) => key != 'dist' || value instanceof String)
      .forEach(([key, value]) => formData.append(key, value));

    return this.http.patch(url, formData, { headers: headers }).pipe(
      map(result => new CustomView().deserialize(result)),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }

  delete(projectName, instance: CustomView): Observable<boolean> {
    const url = this.apiService.projectMethodURL(projectName, `custom_views/${instance.uniqueName}/`);
    let headers = new HttpHeaders();

    headers = this.apiService.setHeadersToken(headers);

    return this.http.delete(url, { headers: headers }).pipe(
      map(result => true),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }
}
