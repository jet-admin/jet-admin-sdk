import { Injectable } from '@app/core';
import { ApiService } from '@app/api/services/api/api.service';
import { AuthService } from '@app/auth/services/auth/auth.service';
import { ProjectApiService } from '@app/api/services/project-api/project-api.service';
import { ProjectsStore } from '@app/projects/stores/projects.store';
import { CurrentUserStore } from '@app/users/stores/current-user.store';
import { ModelDescriptionStore } from '@app/models/stores/model-description.store';
import { ModelService } from '@app/models/services/model/model.service';

@Injectable
export class PublicApiService {

  constructor(private _apiService: ApiService,
              private _authService: AuthService,
              private _projectApiService: ProjectApiService,
              private _projectsStore: ProjectsStore,
              private _currentUserStore: CurrentUserStore,
              private _modelDescriptionStore: ModelDescriptionStore,
              private _modelService: ModelService) { }

  public get apiService(): ApiService {
    return this._apiService;
  }

  public get authService(): AuthService {
    return this._authService;
  }

  public get projectApiService(): ProjectApiService {
    return this._projectApiService;
  }

  public get projectsStore(): ProjectsStore {
    return this._projectsStore;
  }

  public get currentUserStore(): CurrentUserStore {
    return this._currentUserStore;
  }

  public get modelDescriptionStore(): ModelDescriptionStore {
    return this._modelDescriptionStore;
  }

  public get modelService(): ModelService {
    return this._modelService;
  }
}
