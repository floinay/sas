import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import {filter, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {isEmpty} from 'lodash-es';


type WithContextType = (context: RouteContext) => any
type NopeContextType = () => any;
export type ObserveRouteMethodType = NopeContextType | WithContextType;
export type QueryParams = { [key: string]: string; }

export interface RouteObserverWatcher {
  url: string;
  callback: ObserveRouteMethodType;
  queryParams: QueryParams;
}

export type RouteParameters = { [key: string]: string; };

export class RouteContext {
  constructor(public params: RouteParameters, public queryParams: RouteParameters) {
  }
}

@Injectable({providedIn: 'root'})
export class RouteListenerService {
  private baseFilter$ = this.router.events.pipe(
    filter((e) => e instanceof NavigationEnd)
  ) as Observable<NavigationEnd>;

  constructor(public router: Router) {

  }

  watch({url, callback, queryParams}: RouteObserverWatcher): Observable<any> {
    return this.baseFilter$.pipe(
      map(e => this.checkUrlAndGetParametersIfExists(url, e.url) as unknown as RouteParameters),
      filter(v => Boolean(v) && this.checkQueryParams(queryParams)),
      tap(value => {
        callback(new RouteContext(value, this.router.routerState.root.snapshot.queryParams));
      })
    );
  }

  private checkQueryParams(params: QueryParams): boolean {
    if (isEmpty(params)) {
      return true;
    }
    const routeParams = this.router.routerState.root.snapshot.queryParams;
    return Boolean(Object.entries(params).filter(([key, value]) => {
      if (value === '*' && key in routeParams) {
        return true;
      }

      return value === routeParams[key];
    }).length)
  }

  private checkUrlAndGetParametersIfExists(url: string, currentUrl: string): false | RouteParameters {
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
