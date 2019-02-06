import { Injectable } from '../../decorators/injectable/injectable';

@Injectable
export class StorageService {

  public set(key: string, value: string) {
    localStorage[key] = value;
  }

  public get(key: string) {
    return localStorage[key];
  }

  public remove(key: string) {
    if (localStorage[key] !== undefined) {
      delete localStorage[key];
    }
  }
}
