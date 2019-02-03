import { Injectable } from '@app/core';

@Injectable
export class AppConfigService {

  public serverBaseUrl = 'https://api.jetadmin.io';

  constructor() { }
}
