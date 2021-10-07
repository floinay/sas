import {Inject, Injectable, Injector} from '@angular/core';
import {filter, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {isEmpty} from 'lodash-es';
import {StateContract} from '../../../state';
import {RouterService} from '../interfaces/router-service';
import {ROUTER_SERVICE} from '../providers';


type WithContextType = (context: RouteContext) => any
type NopeContextType = () => any;
export type ObserveRouteMethodType = NopeContextType | WithContextType;
export type QueryParams = { [key: string]: string; }

export interface RouteObserverWatcher {
  url: string;
  callback: ObserveRouteMethodType;
  base: StateContract<any>;
  queryParams: QueryParams;
}

export type RouteParameters = { [key: string]: string; };

export class RouteContext {
  constructor(public params: RouteParameters, public queryParams: RouteParameters) {
  }
}

@Injectable({providedIn: 'root'})
export class RouteListenerService {
  constructor(@Inject(ROUTER_SERVICE) private router: RouterService, private injector: Injector) {

  }

  watch({url, callback, queryParams, base}: RouteObserverWatcher): Observable<any> {
    return this.router.onNavigationEnd$.pipe(
      map(e => this.checkUrlAndGetParametersIfExists(url, e) as unknown as RouteParameters),
      filter(v => Boolean(v) && this.checkQueryParams(queryParams)),
      tap(value => {
        const bindCallback = callback.bind(this.injector.get(base));
        bindCallback(new RouteContext(value, this.router.queryParams()));
      })
    );
  }

  private checkQueryParams(params: QueryParams): boolean {
    if (isEmpty(params)) {
      return true;
    }
    const routeParams = this.router.queryParams();
    return Boolean(Object.entries(params).filter(([key, value]) => {
      if (value === '*' && key in routeParams) {
        return true;
      }

      return value === routeParams[key];
    }).length)
  }

  private checkUrlAndGetParametersIfExists(url: string, currentUrl: string): false | RouteParameters {
    console.log(url);
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
      const currentUrlPath = splitUrl[i];

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
