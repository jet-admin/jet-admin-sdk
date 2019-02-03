import 'reflect-metadata';

export declare const Type: FunctionConstructor;
export interface Type<T> extends Function {
  new (...args: any[]): T;
}

export class Injectables {

  private injectables: any[]= [];

  public add(token) {
    if (this.isInjectable(token)) {
      return;
    }

    this.injectables.push(token);
  }

  public isInjectable(token) {
    return this.injectables.find(item => item === token) != undefined;
  }
}

export const injectables = new Injectables();

export class Injector {

  tokens: { token: any, instance: any }[] = [];

  constructor() {
    injectables.add(Injector);
    this.tokens.push({ token: Injector, instance: this });
  }

  get<T>(token: Type<T>) {
    const item = this.tokens.find(item => item.token === token);
    if (!item) {
      return;
    }
    return item.instance;
  }

  getOrCreate<T>(token: Type<T>) {
    const instance = this.get(token);
    if (!instance) {
      return this.create(token);
    }
    return instance;
  }

  create<T>(token: Type<T>) {
    if (!injectables.isInjectable(token)) {
      throw new Error(`Not injectable ${token}`);
    }

    const argTypes = Reflect.getMetadata('design:paramtypes', token) || [];
    const args = argTypes.map(item => this.getOrCreate(item));
    const instance = new token(...args);

    this.tokens.push({ token: token, instance: instance });

    return instance;
  }
}
