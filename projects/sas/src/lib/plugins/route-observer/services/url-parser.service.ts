import { Inject, Injectable } from '@angular/core';
import { QueryParams, RouteParameters } from './observe-route.service';
import { isEmpty } from 'lodash-es';
import { ROUTER_SERVICE } from '../providers';
import { RouterService } from '../interfaces/router-service';

@Injectable({
  providedIn: 'root'
})
export class UrlParserService {

  constructor(@Inject(ROUTER_SERVICE) readonly router: RouterService) {
  }

  checkQueryParams(params: QueryParams, currentParams?: QueryParams): boolean {
    if (isEmpty(params)) {
      return true;
    }
    const routeParams = currentParams || this.router.queryParams();

    return Boolean(Object.entries(params).filter(([key, value]) => {
      if (value === '*' && key in routeParams) {
        return true;
      }

      return value === routeParams[key];
    }).length);
  }


  checkUrlAndGetParametersIfExists(url: string, currentUrl: string): false | RouteParameters {
    if (url === currentUrl) {
      return {};
    }
    const splitUrl = url.split('/');
    const splitCurrentUrl = currentUrl.split('/');
    const parameters: RouteParameters = {};
    if (splitCurrentUrl.length !== splitUrl.length) {
      return false;
    }

    for (let i = 0; i < splitUrl.length; i++) {
      const urlPath = splitUrl[i];
      const currentUrlPath = splitCurrentUrl[i];

      if (urlPath.includes(':')) {
        parameters[urlPath.replace(':', '')] = currentUrlPath;
        continue;
      }

      if (urlPath !== currentUrlPath) {
        return false;
      }
    }

    return parameters;
  }
}
