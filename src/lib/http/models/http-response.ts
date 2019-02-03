import { HttpHeaders } from '@app/http';

export class HttpResponseBase {

  readonly headers: HttpHeaders;
  readonly status: number;
  readonly statusText: string;

  constructor(init: {
    headers?: HttpHeaders;
    status?: number;
    statusText?: string;
    // url?: string;
  }) {
    this.headers = init.headers;
    this.status = init.status;
    this.statusText = init.statusText;
  }
}

export class HttpResponse<T> extends HttpResponseBase {

  readonly body: T | null;

  constructor(init: {
    body?: T | null;
    error?: any;
    headers?: HttpHeaders;
    status?: number;
    statusText?: string;
    // url?: string;
  }) {
    super({ headers: init.headers, status: init.status, statusText: init.statusText });
    this.body = init.error;
  }
}

export class HttpErrorResponse extends HttpResponseBase {

  readonly error: any | null;

  constructor(init: {
    error?: any;
    headers?: HttpHeaders;
    status?: number;
    statusText?: string;
    // url?: string;
  }) {
    super({ headers: init.headers, status: init.status, statusText: init.statusText });
    this.error = init.error;
  }
}
