import * as _ from 'lodash';

import { User } from '../../users/models/user';

import { ProjectGroup } from './project-group';
import { ProjectPermissions, ProjectPermissionType } from './project-permission';

export class Project {

  public uniqueName: string;
  public name: string;
  public apiBaseUrl: string;
  public color: string;
  public logo: string;
  public url: string;
  public owner: User;
  public parent: number;
  public demo: boolean;
  public defaultTheme: string;
  public group: ProjectGroup;
  public isOwner = false;

  deserialize(data: Object): Project {
    this.uniqueName = data['unique_name'];
    this.name = data['name'];
    this.apiBaseUrl = data['api_base_url'];
    this.color = data['color'];
    this.logo = data['logo'];
    this.url = data['url'];
    this.parent = data['parent'];
    this.demo = data['demo'];
    this.defaultTheme = data['default_theme'];
    this.isOwner = data['is_owner'];

    if (data['owner']) {
      this.owner = new User().deserialize(data['owner']);
    }

    if (data['group']) {
      this.group = new ProjectGroup().deserialize(data['group']);
    }

    return this;
  }

  serialize(fields?: string[]): Object {
    let data: Object = {
      name: this.name,
      unique_name: this.uniqueName,
      api_base_url: this.apiBaseUrl,
      color: this.color,
      default_theme: this.defaultTheme,
      url: this.url
    };
    if (fields) {
      data = <Object>_.pickBy(data, (v, k) => fields.indexOf(k) != -1);
    }
    return data;
  }

  get link() {
    return ['/app', this.uniqueName];
  }

  hasProjectPermission(permission: ProjectPermissions) {
    return this.isOwner || this.group.superGroup || this.group.permissions.find(item => {
        return item.permissionType == ProjectPermissionType.Project
          && item.permissionObject == permission.toString();
      }) != undefined;
  }

  hasModelPermission(model: string, action: string) {
    return this.isOwner || this.group.superGroup || this.group.permissions.find(item => {
        return item.permissionType == ProjectPermissionType.Model
          && item.permissionObject == model
          && item.permissionActions.toLowerCase().indexOf(action.toLowerCase()) != -1;
      }) != undefined;
  }

  hasProjectSettingsPermission() {
    return this.hasProjectPermission(ProjectPermissions.ProjectSettings);
  }

  hasProjectBillingPermission() {
    return this.hasProjectPermission(ProjectPermissions.ProjectBilling);
  }

  hasProjectAccessPermission() {
    return this.hasProjectPermission(ProjectPermissions.ProjectAccess);
  }

  hasProjectCustomizationPermission() {
    return this.hasProjectPermission(ProjectPermissions.ProjectCustomization);
  }

  hasProjectPermissions() {
    return this.hasProjectSettingsPermission()
      || this.hasProjectBillingPermission()
      || this.hasProjectAccessPermission();
  }
}
