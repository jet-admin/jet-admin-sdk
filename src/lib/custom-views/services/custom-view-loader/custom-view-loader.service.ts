import { combineLatest, Observable, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '../../../core/decorators/injectable/injectable';

import { CustomView } from '../../models/custom-view';

@Injectable
export class CustomViewLoaderService {

  load(view: CustomView): Observable<boolean> {
    if (this.isLoaded(view.uniqueName)) {
      return of(true);
    }

    const obs = [];

    if (view.params['js']) {
      view.params['js'].forEach(item => {
        obs.push(this.loadScript(`${view.distBaseAbsoluteUrl}${item}`));
      });
    }

    if (view.params['css']) {
      view.params['css'].forEach(item => {
        obs.push(this.loadStyle(`${view.distBaseAbsoluteUrl}${item}`));
      });
    }

    return combineLatest(obs).pipe(map(result => result.every(item => item == true)));
  }

  isLoaded(name) {
    return !!customElements.get(name);
  }

  loadScript(url): Observable<boolean> {
    const result = new ReplaySubject<boolean>(1);
    const node = document.createElement('script');

    node.src = url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    node.onload = () => result.next(true);
    node.onerror = () => result.next(false);
    document.getElementsByTagName('body')[0].appendChild(node);

    return result.asObservable();
  }

  loadStyle(url): Observable<boolean> {
    const result = new ReplaySubject<boolean>(1);
    const node = document.createElement('link');

    node.href = url;
    node.type = 'text/css';
    node.rel = 'stylesheet';
    node.onload = () => result.next(true);
    node.onerror = () => result.next(false);
    document.getElementsByTagName('body')[0].appendChild(node);

    return result.asObservable();
  }
}
