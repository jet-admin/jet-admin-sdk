import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '../../core/decorators/injectable/injectable';
import { SingletonStore } from '../../shared/stores/singleton.store';

import { ProjectService } from '../../projects/services/project/project.service';
import { Project } from '../../projects/models/project';

@Injectable
export class ProjectsStore extends SingletonStore<Project[]> {

  private currentName = new BehaviorSubject<string>(undefined);

  constructor(private projectService: ProjectService) {
    super();
    this.get();
  }

  protected fetch(): Observable<Project[]> {
    return this.projectService.get().pipe(map(response => response.results));
  }

  public get current() {
    if (!this.instance || !this.currentName.value) {
      return;
    }

    return this.instance.find(item => item.uniqueName == this.currentName.value);
  }

  public get current$() {
    return combineLatest(this.instance$, this.currentName).pipe(map(([projects, currentName]) => {
      if (!projects || !currentName) {
        return;
      }

      return projects.find(item => item.uniqueName == currentName);
    }));
  }

  public setCurrent(name): Observable<Project> {
    if (this.currentName.value != name) {
      this.currentName.next(name);
    }
    window['project'] = name;
    return this.current$;
  }
}
