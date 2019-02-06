/*
 * Public API Surface of jet-admin-sdk
 */

import { Injector } from '@app/core';
import { PublicApiService } from '@app/custom-views/services/public-api/public-api.service';

const injector = new Injector();

let publicApiService: PublicApiService;

export function getPublicApiService() {
  if (window['jet_public_api']) {
    return window['jet_public_api'];
  }

  publicApiService = injector.getOrCreate<PublicApiService>(PublicApiService);
  return publicApiService;
}

export * from '@app/actions';
export * from '@app/api';
export * from '@app/auth';
export * from '@app/charts';
export * from '@app/core';
export * from '@app/custom-views';
export * from '@app/fields';
export * from '@app/filters';
export * from '@app/http';
export * from '@app/menu';
export * from '@app/messages';
export * from '@app/models';
export * from '@app/projects';
export * from '@app/shared';
export * from '@app/users';
