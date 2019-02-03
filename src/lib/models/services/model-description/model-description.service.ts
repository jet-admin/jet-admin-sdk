import { Observable } from 'rxjs';
import { map, publishLast, refCount, switchMap } from 'rxjs/operators';
import * as _ from 'lodash';

import { Injectable } from '@app/core';
import { HttpClient, HttpHeaders } from '@app/http';
import { ApiService } from '@app/api/services/api/api.service';
import { ProjectApiService } from '@app/api/services/project-api/project-api.service';

import { ModelDescription } from '../../models/model-description';

@Injectable
export class ModelDescriptionService {

  constructor(private http: HttpClient,
              private apiService: ApiService,
              private projectApiService: ProjectApiService) { }

  get(projectName: string, params = {}): Observable<ModelDescription[]> {
    const projectUrl = this.projectApiService.methodURL('model_descriptions/');
    const url = this.apiService.projectMethodURL(projectName, 'model_descriptions/');
    let headers = new HttpHeaders();

    headers = this.apiService.setHeadersToken(headers);

    return this.http.get<Object[]>(projectUrl, { headers: headers, params: params, observe: 'response' }).pipe(
      map(result => result.map(item => new ModelDescription().deserialize(item))),
      switchMap((projectResult: ModelDescription[]) => {
        return this.http.get<Object[]>(url, { headers: headers, params: params }).pipe(
          map(result => result.map(item => {
            _.toPairs(JSON.parse(item['params'])).forEach(([k, v]) => item[k] = v);
            delete item['params'];
            return item;
          })),
          map(result => result.map(item => new ModelDescription().deserialize(item))),
          map((apiResult: ModelDescription[]) => {
            projectResult.forEach(projectModel => {
              projectModel.project = projectName;
            });

            apiResult.forEach(apiModel => {
              const projectModel = projectResult.find(item => item.model == apiModel.model);

              if (!projectModel) {
                return;
              }

              ['dbTable', 'verboseName', 'verboseNamePlural', 'hidden', 'orderingField', 'defaultOrderBy', 'displayField', 'primaryKeyField']
                .filter(item => projectModel.hasOwnProperty(item) && apiModel.hasOwnProperty(item))
                .forEach(item => projectModel[item] = apiModel[item]);

              apiModel.fields.forEach(apiField => {
                const projectField = projectModel.fields.find(item => item.name == apiField.name);

                if (!projectField) {
                  return;
                }

                ['verboseName', 'field', 'editable', 'filterable', 'params']
                  .filter(item => projectField.hasOwnProperty(item) && apiField.hasOwnProperty(item))
                  .forEach(item => projectField[item] = apiField[item]);

                // projectField.updateFieldDescription();
              });

              apiModel.flexFields.forEach(apiField => {
                const projectField = projectModel.flexFields.find(item => item.name == apiField.name);

                if (projectField) {
                  ['verboseName', 'field', 'query', 'code', 'params']
                    .filter(item => projectField.hasOwnProperty(item) && apiField.hasOwnProperty(item))
                    .forEach(item => projectField[item] = apiField[item]);
                } else {
                  projectModel.flexFields.push(apiField);
                }
              });

              apiModel.segments.forEach(apiSegment => {
                const projectSegment = projectModel.segments.find(item => item.label == apiSegment.label);

                if (projectSegment) {
                  ['label', 'filterItems', 'visible']
                    .filter(item => projectSegment.hasOwnProperty(item) && apiSegment.hasOwnProperty(item))
                    .forEach(item => projectSegment[item] = apiSegment[item]);
                } else {
                  projectModel.segments.push(apiSegment);
                }
              });

              apiModel.relations.forEach(apiRelation => {
                const projectRelation = projectModel.flexFields.find(item => item.name == apiRelation.name);

                if (!projectRelation) {
                  return;
                }

                ['verboseName', 'field']
                  .filter(item => projectRelation.hasOwnProperty(item) && apiRelation.hasOwnProperty(item))
                  .forEach(item => projectRelation[item] = apiRelation[item]);
              });
            });

            return projectResult;
          }));
      }),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }

  getDetail(projectName: string, model, params = {}): Observable<ModelDescription> {
    return this.get(projectName, params)
      .pipe(map(results => results.find(item => item.model == model)));
  }

  update(projectName: string, modelDescription: ModelDescription): Observable<ModelDescription> {
    const url = this.apiService.projectMethodURL(projectName, 'model_descriptions/');
    let headers = new HttpHeaders();

    headers = this.apiService.setHeadersToken(headers);

    const params = modelDescription.serialize();

    delete params['project'];
    delete params['model'];

    const data = {
      project: modelDescription.project,
      model: modelDescription.model,
      params: JSON.stringify(params)
    };

    return this.http.post(url, data, { headers: headers }).pipe(
      map(result => new ModelDescription().deserialize(result)),
      this.apiService.catchApiError(),
      publishLast(),
      refCount()
    );
  }
}
