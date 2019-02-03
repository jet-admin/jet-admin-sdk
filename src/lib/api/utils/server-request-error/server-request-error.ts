import { HttpErrorResponse } from '@app/http';
import * as _ from 'lodash';

export class ServerRequestError {

  nonFieldErrors: string[] = [];
  fieldErrors: Object;
  nonFieldErrorsKey = 'non_field_errors';

  constructor(error: HttpErrorResponse | Object | any) {
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof Object && error.status == 400) {
        if (error.error[this.nonFieldErrorsKey] != undefined) {
          this.nonFieldErrors = error.error[this.nonFieldErrorsKey];
          delete error.error[this.nonFieldErrorsKey];
        } else {
          this.nonFieldErrors = [];
        }

        this.fieldErrors = error.error;
      } else if (error.error instanceof Object && error.error['detail']) {
        this.nonFieldErrors = [error.error['detail']];
        this.fieldErrors = {};
      } else if (error.status == 500) {
        this.nonFieldErrors = ['Server error'];
        this.fieldErrors = {};
      } else if (error.status >= 501 && error.status < 600) {
        this.nonFieldErrors = ['Server is not available'];
        this.fieldErrors = {};
      } else {
        this.nonFieldErrors = [ error['message'] ? error['message'] : error.toString() ];
        this.fieldErrors = {};
      }
    } else if (error instanceof Error) {
      this.nonFieldErrors = [error.message];
      this.fieldErrors = {};
    } else if (error instanceof Object) {
      try {
        if (error[this.nonFieldErrorsKey] != undefined) {
          this.nonFieldErrors = error[this.nonFieldErrorsKey];
          delete error[this.nonFieldErrorsKey];
        } else {
          this.nonFieldErrors = [];
        }

        this.fieldErrors = error;
      } catch (e) {
        this.nonFieldErrors = [error.statusText];
        this.fieldErrors = {};
      }
    } else {
      this.nonFieldErrors = [ error['message'] ? error['message'] : error.toString() ];
      this.fieldErrors = {};
    }
  }

  get errors() {
    return [].concat(
      this.nonFieldErrors,
      ..._.values(this.fieldErrors)
    );
  }

  serialize(): string {
    return JSON.stringify({
      nonFieldErrors: this.nonFieldErrors,
      fieldErrors: this.fieldErrors
    });
  }
}
