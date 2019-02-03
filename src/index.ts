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
