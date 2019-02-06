import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '../../../core/decorators/injectable/injectable';

@Injectable
export class MenuService {

  _opened = new BehaviorSubject<boolean>(false);

  constructor() { }

  set opened(value: boolean) {
    this._opened.next(value);
  }

  get opened(): boolean {
    return this._opened.value;
  }

  get opened$(): Observable<boolean> {
    return this._opened.asObservable();
  }

  toggleOpened() {
    this.opened = !this.opened;
  }
}
