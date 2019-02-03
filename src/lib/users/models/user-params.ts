import * as _ from 'lodash';

export class UserParams {
  public projectOnboardingShowed: string[] = [];

  deserialize(data: Object): UserParams {
    if (data['project_onboarding_showed']) {
      this.projectOnboardingShowed = data['project_onboarding_showed'];
    }

    return this;
  }

  serialize(fields?: string[]): Object {
    let data: Object = {
      project_onboarding_showed: this.projectOnboardingShowed
    };
    if (fields) {
      data = <Object>_.pickBy(data, (v, k) => fields.indexOf(k) != -1);
    }
    return data;
  }

  hasProjectOnboardingShowed(name) {
    return this.projectOnboardingShowed.find(item => item === name) != undefined;
  }

  addProjectOnboardingShowed(name) {
    if (this.hasProjectOnboardingShowed(name)) {
      return;
    }

    this.projectOnboardingShowed.push(name);
  }
}
