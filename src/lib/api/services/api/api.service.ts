import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Injectable } from '@app/core';
import { HttpErrorResponse, HttpHeaders } from '@app/http';
import { AppConfigService } from '@app/core/services/app-config/app-config.service';
import { StorageService } from '@app/core/services/storage/storage.service';

import { ServerRequestError } from '../../utils/server-request-error/server-request-error';

@Injectable
export class ApiService {

  constructor(private storageService: StorageService,
              private appConfigService: AppConfigService) { }

  public get apiBaseUrl() {
    return `${this.appConfigService.serverBaseUrl}/api/`;
  }

  public methodURL(method) {
    return `${this.apiBaseUrl}${method}`;
  }

  public projectMethodURL(projectName, method) {
    return `${this.apiBaseUrl}projects/${projectName}/${method}`;
  }

  public getToken() {
    return this.storageService.get('token');
  }

  public getProjectToken() {
    return this.storageService.get('project_token');
  }

  public setHeadersToken(headers: HttpHeaders) {
    const token = this.getToken();
    const projectToken = this.getProjectToken();

    if (token) {
      return headers.set('Authorization', `Token ${token}`);
    } else if (projectToken) {
      return headers.set('Authorization', `ProjectToken ${projectToken}`);
    } else {
      return headers;
    }
  }

  public isUserToken() {
    return this.storageService.get('token') != undefined;
  }

  public isProjectToken() {
    return !this.isUserToken() && this.storageService.get('project_token') != undefined;
  }

  public saveToken(token: string) {
    this.storageService.set('token', token);
    this.deleteProjectToken();
  }

  public deleteToken() {
    this.storageService.remove('token');
  }

  public saveProjectToken(token: string) {
    const expires = new Date();
    expires.setDate(expires.getDate() + 30);

    this.storageService.set('project_token', token);
    this.deleteToken();
  }

  public deleteProjectToken() {
    this.storageService.remove('project_token');
  }

  public catchApiError(processAuthExpire = true) {
    return catchError(error => {
      if (processAuthExpire && error instanceof HttpErrorResponse && error.status == 401) {
        console.error(error);
      }

      const serverError = new ServerRequestError(error);

      return throwError(serverError);
    });
  }
}
