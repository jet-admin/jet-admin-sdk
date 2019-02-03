import { injectables } from '../../services/injector/injector.service';

export function Injectable(constructor: any) {
  injectables.add(constructor);
}
