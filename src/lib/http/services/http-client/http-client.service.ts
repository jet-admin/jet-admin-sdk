import axios from 'axios'
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '../../../core/decorators/injectable/injectable';
import { HttpHeaders } from '../../models/http-headers';
import { HttpParams } from '../../models/http-params';

@Injectable
export class HttpClient {


  request<T>(method: string, url: string, options: {
    body?: any;
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body' | 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
  }): Observable<T> {
    options = options || {};

    if (options['headers'] && options['headers'] instanceof HttpHeaders) {
      options['headers'] = options['headers'].toObject();
    }

    return from(axios.request<T>({
      url: url,
      method: method,
      headers: options['headers'],
      params: options['params'],
      data: options['body']
    })).pipe(map(result => {
      return result.data;
    }));
  }

  get<T>(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body' | 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
  }): Observable<T> {
    return this.request('get', url, options);
  }

  post<T>(url: string, body: any | null, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body' | 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
  }): Observable<T> {
    options['body'] = body;
    return this.request('post', url, options);
  }

  patch<T>(url: string, body: any | null, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body' | 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
  }): Observable<T> {
    options['body'] = body;
    return this.request('patch', url, options);
  }

  delete<T>(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body' | 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
  }): Observable<T> {
    return this.request('delete', url, options);
  }
}
