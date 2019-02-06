import { EMPTY, Observable, of } from 'rxjs';
import { map, publishLast, refCount, switchMap } from 'rxjs/operators';

import { Injectable, Injector } from '../../../core';
import { HttpClient, HttpHeaders } from '../../../http';
import { ProjectApiService } from '../../../api/services/project-api/project-api.service';
import { DataGroup } from '../../../charts/models/data-group';
import { Factory } from '../../../shared/services/factory/factory.service';

import { Model } from '../../models/model';

export enum Func {
  Count = 'Count',
  Sum = 'Sum',
  Min = 'Min',
  Max = 'Max',
  Avg = 'Avg'
}

@Injectable
export class ModelService {

  constructor(private http: HttpClient,
              private factory: Factory,
              private apiService: ProjectApiService) { }

  public get(model: string, params = {}): Observable<ModelService.GetResponse> {
    const url = this.apiService.modelUrl(model);
    let headers = new HttpHeaders();

    headers = this.apiService.setHeadersToken(headers);

    return this.http.get(url, { headers: headers, params: params, observe: 'response' }).pipe(
      map(result => this.factory.create<ModelService.GetResponse>(ModelService.GetResponse).deserialize(model, result)),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }

  public getDetail(model: string, id: number, params = {}): Observable<Model> {
    const url = this.apiService.detailModelUrl(model, id);
    let headers = new HttpHeaders();

    headers = this.apiService.setHeadersToken(headers);

    return this.http.get(url, { headers: headers, params: params, observe: 'response' }).pipe(
      map(result => this.factory.create<Model>(Model).deserialize(model, result)),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }

  public create(model: string, modelInstance: Model, fields: string[]): Observable<Model> {
    const url = this.apiService.modelUrl(model);
    let headers = new HttpHeaders();

    headers = this.apiService.setHeadersToken(headers);

    return this.http.post(url, modelInstance.serialize(fields), { headers: headers, observe: 'response' }).pipe(
      map(result => this.factory.create<Model>(Model).deserialize(model, result)),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }

  public update(model: string, modelInstance: Model, fields: string[]): Observable<Model> {
    const url = this.apiService.detailModelUrl(model, modelInstance.__primary_key__);
    let headers = new HttpHeaders();

    headers = this.apiService.setHeadersToken(headers);

    return this.http.patch(url, modelInstance.serialize(fields), { headers: headers, observe: 'response' }).pipe(
      map(result => this.factory.create<Model>(Model).deserialize(model, result)),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }

  public delete(model: string, modelInstance: Model): Observable<Object> {
    const url = this.apiService.detailModelUrl(model, modelInstance.__primary_key__);
    let headers = new HttpHeaders();

    headers = this.apiService.setHeadersToken(headers);

    return this.http.delete(url, { headers: headers, observe: 'response' }).pipe(
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }

  public applyAction(model: string, action: string, data: Object): Observable<Object> {
    const url = this.apiService.actionUrl(model, action);
    let headers = new HttpHeaders();

    headers = this.apiService.setHeadersToken(headers);

    return this.http.post(url, data, { headers: headers, observe: 'response' }).pipe(
      map(result => this.factory.create<Model>(Model).deserialize(model, result)),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }

  public reorder(model: string,
          orderingField: string,
          forward: boolean,
          segmentFrom: number,
          segmentTo: number,
          item: number): Observable<Object> {
    const url = this.apiService.actionUrl(model, 'reorder');
    let headers = new HttpHeaders();
    const data = {
      ordering_field: orderingField,
      forward: forward,
      segment_from: segmentFrom,
      segment_to: segmentTo,
      item: item
    };

    headers = this.apiService.setHeadersToken(headers);

    return this.http.post(url, data, { headers: headers, observe: 'response' }).pipe(
      map(result => this.factory.create<Model>(Model).deserialize(model, result)),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }

  public resetOrder(model: string, orderingField: string): Observable<Object> {
    const url = this.apiService.actionUrl(model, 'reset_order');
    let headers = new HttpHeaders();
    const data = {
      ordering_field: orderingField
    };

    headers = this.apiService.setHeadersToken(headers);

    return this.http.post(url, data, { headers: headers, observe: 'response' }).pipe(
      map(result => this.factory.create<Model>(Model).deserialize(model, result)),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }

  public aggregate(model: string, yFunc: Func, yColumn: string, params = {}): Observable<any> {
    const url = this.apiService.actionUrl(model, 'aggregate');
    let headers = new HttpHeaders();

    headers = this.apiService.setHeadersToken(headers);

    params['_y_func'] = yFunc;

    if (yColumn) {
      params['_y_column'] = yColumn;
    }

    return this.http.get(url, { headers: headers, params: params, observe: 'response' }).pipe(
      map(result => result['y_func']),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }

  public group(model: string, xColumn: string, xLookup: string, yFunc: Func, yColumn: string, params = {}): Observable<DataGroup[]> {
    const url = this.apiService.actionUrl(model, 'group');
    let headers = new HttpHeaders();

    headers = this.apiService.setHeadersToken(headers);

    params['_x_column'] = xColumn;

    if (xLookup) {
      params['_x_lookup'] = xLookup;
    }

    params['_y_func'] = yFunc;

    if (yColumn) {
      params['_y_column'] = yColumn;
    }

    return this.http.get<Object[]>(url, { headers: headers, params: params, observe: 'response' }).pipe(
      map(result => result.map(item => new DataGroup().deserialize(item))),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }

  public sql(query, params?: string[]): Observable<ModelService.SqlResponse> {
    const url = this.apiService.methodURL('sql/');
    let headers = new HttpHeaders();
    const data = {
      query: query,
      params: params ? params.join(',') : undefined
    };

    headers = this.apiService.setHeadersToken(headers);

    return this.http.post<any[] | Object>(url, data, { headers: headers, observe: 'response' }).pipe(
      map(result => {
        if (result instanceof Array) {
          return new ModelService.SqlResponse().deserialize({
            data: result
          });
        }

        return new ModelService.SqlResponse().deserialize(result);
      }),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }

  // TODO: implement
  // public uploadFile(file: File, path: string, filename?: string): Observable<ModelService.UploadFileResponse> {
  //   const url = this.apiService.methodURL('file_upload/');
  //   let headers = new HttpHeaders();
  //   const data = new FormData();
  //
  //   data.append('file', file);
  //   data.append('path', path);
  //
  //   if (filename) {
  //     data.append('filename', filename);
  //   }
  //
  //   headers = this.apiService.setHeadersToken(headers);
  //
  //   return this.http.post(url, data, { headers: headers, observe: 'events', reportProgress: true }).pipe(
  //     switchMap(event => {
  //       if (event.type == HttpEventType.Response) {
  //         return of(event).pipe(
  //           this.apiService.catchApiError(),
  //           map<Object, ModelService.UploadFileResponse>(result => {
  //             return {
  //               result: {
  //                 uploadedPath: result['uploaded_path'],
  //                 uploadedUrl: result['uploaded_url'],
  //               },
  //               state: {
  //                 downloadProgress: 1,
  //                 uploadProgress: 1
  //               }
  //             };
  //           })
  //         );
  //       } else if (event.type == HttpEventType.UploadProgress) {
  //         return of({
  //           state: {
  //             uploadProgress: event.loaded / event.total,
  //             downloadProgress: 0,
  //             uploadLoaded: event.loaded,
  //             uploadTotal: event.total
  //           }
  //         });
  //       } else if (event.type == HttpEventType.DownloadProgress) {
  //         return of({
  //           state: {
  //             uploadProgress: 1,
  //             downloadProgress: event.loaded / event.total,
  //             downloadLoaded: event.loaded,
  //             downloadTotal: event.total
  //           }
  //         });
  //       } else {
  //         return EMPTY;
  //       }
  //     })
  //   );
  // }
}

export namespace ModelService {

  export class GetResponse {

    private factory: Factory;

    public results: Model[];
    public next: string;
    public previous: string;
    public count: number;
    public numPages: number;
    public perPage: number;

    constructor(private injector: Injector) {
      this.factory = this.injector.get<Factory>(Factory);
    }

    deserialize(model: string, data: Object) {
      this.results = data['results'].map(item => this.factory.create<Model>(Model).deserialize(model, item));
      this.next = data['next'];
      this.previous = data['previous'];
      this.count = data['count'];
      this.numPages = data['num_pages'];
      this.perPage = data['per_page'];

      return this;
    }
  }

  export class SqlResponse {
    public data: any[][];
    public columns: string[];

    deserialize(data: Object) {
      this.data = data['data'];
      this.columns = data['columns'];

      return this;
    }
  }

  export interface UploadFileState {
    uploadProgress: number;
    uploadLoaded?: number;
    uploadTotal?: number;
    downloadProgress: number;
    downloadLoaded?: number;
    downloadTotal?: number;
  }

  export interface UploadFileResult {
    uploadedPath: string;
    uploadedUrl: string;
  }

  export interface UploadFileResponse {
    state: UploadFileState;
    result?: UploadFileResult;
  }
}
