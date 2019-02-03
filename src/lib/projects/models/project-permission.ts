
export enum ProjectPermissionType {
  Model = 'model',
  Project = 'project'
}

export enum ProjectPermissions {
  ProjectSettings = 'project_settings',
  ProjectBilling = 'project_billing',
  ProjectAccess = 'project_access',
  ProjectCustomization = 'project_customization'
}

export const projectPermissions = [
  ProjectPermissions.ProjectSettings,
  ProjectPermissions.ProjectBilling,
  ProjectPermissions.ProjectAccess,
  ProjectPermissions.ProjectCustomization,
];

export class ProjectPermission {
  public id: number;
  public group: number;
  public permissionType: ProjectPermissionType;
  public permissionObject: string;
  public permissionActions: string;
  public dateAdd: string;

  deserialize(data: Object): ProjectPermission {
    this.id = data['id'];
    this.group = data['group'];
    this.permissionType = data['permission_type'];
    this.permissionObject = data['permission_object'];
    this.permissionActions = data['permission_actions'];
    this.dateAdd = data['date_add'];

    return this;
  }

  serialize(): Object {
    return {
      id: this.id,
      group: this.group,
      permission_type: this.permissionType,
      permission_object: this.permissionObject,
      permission_actions: this.permissionActions,
      date_add: this.dateAdd
    };
  }
}
