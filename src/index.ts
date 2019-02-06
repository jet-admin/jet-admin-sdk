/*
 * Public API Surface of jet-admin-sdk
 */

import { Injector } from './lib/core/services/injector/injector.service';
import { PublicApiService } from './lib/custom-views/services/public-api/public-api.service';

const injector = new Injector();

let publicApiService: PublicApiService;

export function getPublicApiService(): PublicApiService {
  if (window['jet_public_api']) {
    return window['jet_public_api'];
  }

  publicApiService = injector.getOrCreate<PublicApiService>(PublicApiService);
  return publicApiService;
}

export * from './lib/actions';
export * from './lib/api';
export * from './lib/auth';
export * from './lib/charts';
export * from './lib/core';
export * from './lib/custom-views';
export * from './lib/fields';
export * from './lib/filters';
export * from './lib/http';
export * from './lib/menu';
export * from './lib/messages';
export * from './lib/models';
export * from './lib/projects';
export * from './lib/shared';
export * from './lib/users';
