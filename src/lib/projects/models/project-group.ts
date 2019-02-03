import { ProjectPermission } from './project-permission';

export class ProjectGroup {
  public id: number;
  public name: string;
  public superGroup: string;
  public permissions: ProjectPermission[] = [];

  deserialize(data: Object): ProjectGroup {
    this.id = data['id'];
    this.name = data['name'];
    this.superGroup = data['super_group'];

    if (data['project_permissions']) {
      this.permissions = data['project_permissions'].map(item => new ProjectPermission().deserialize(item));
    }

    return this;
  }

  serialize(): Object {
    return {
      id: this.id,
      name: this.name,
      super_group: this.superGroup,
      project_permissions: this.permissions.map(item => item.serialize())
    };
  }
}
