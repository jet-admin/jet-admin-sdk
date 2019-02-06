import { Injectable } from '../../decorators/injectable/injectable';

@Injectable
export class AppConfigService {

  public serverBaseUrl = 'https://api.jetadmin.io';

  constructor() { }
}
