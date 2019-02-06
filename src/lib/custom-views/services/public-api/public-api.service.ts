import { Injectable } from '../../../core/decorators/injectable/injectable';
import { ApiService } from '../../../api/services/api/api.service';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { ProjectApiService } from '../../../api/services/project-api/project-api.service';
import { ProjectsStore } from '../../../projects/stores/projects.store';
import { CurrentUserStore } from '../../../users/stores/current-user.store';
import { ModelDescriptionStore } from '../../../models/stores/model-description.store';
import { ModelService } from '../../../models/services/model/model.service';

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
