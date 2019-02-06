import { Injectable, Injector, Type } from '../../../core';

@Injectable
export class Factory {

  constructor(private injector: Injector) { }

  create<T>(cls: Type<T>): T {
    return new cls(this.injector);
  }
}
