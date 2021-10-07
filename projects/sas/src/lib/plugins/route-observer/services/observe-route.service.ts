import {Inject, Injectable, Injector} from '@angular/core';
import {filter, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {StateContract} from '../../../state';
import {RouterService} from '../interfaces/router-service';
import {ROUTER_SERVICE} from '../providers';
import {UrlParserService} from './url-parser.service';
import {RouteContext} from './context/route-context';


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



@Injectable({providedIn: 'root'})
export class ObserveRouteService {
  constructor(@Inject(ROUTER_SERVICE) private router: RouterService,
              private urlService: UrlParserService,
              private injector: Injector) {

  }

  watch({url, callback, queryParams, base}: RouteObserverWatcher): Observable<any> {
    return this.router.onNavigationEnd$.pipe(
      map(e => this.urlService.checkUrlAndGetParametersIfExists(url, e) as unknown as RouteParameters),
      filter(v => Boolean(v) && this.urlService.checkQueryParams(queryParams)),
      tap(value => {
        const bindCallback = callback.bind(this.injector.get(base));
        bindCallback(new RouteContext(value, this.router.queryParams()));
      })
    );
  }
}
