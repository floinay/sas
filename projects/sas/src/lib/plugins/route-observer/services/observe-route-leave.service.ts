import {Inject, Injectable, Injector} from '@angular/core';
import {ROUTER_SERVICE} from '../providers';
import {RouterService} from '../interfaces/router-service';
import {Observable} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {QueryParams, RouteContext, RouteObserverWatcher, RouteParameters} from './observe-route.service';
import {isEmpty} from 'lodash-es';
import {UrlParserService} from './url-parser.service';

@Injectable({
  providedIn: 'root'
})
export class ObserveRouteLeaveService {
  private previousUrl?: string;
  private previousQueryParams?: QueryParams;

  private get notFirstRoute(): boolean {
    return Boolean(this.previousUrl !== undefined && this.previousQueryParams !== undefined);
  }

  constructor(@Inject(ROUTER_SERVICE) readonly router: RouterService,
              private urlService: UrlParserService,
              private injector: Injector) {
  }

  watch({url, callback, queryParams, base}: RouteObserverWatcher): Observable<any> {
    return this.router.onNavigationEnd$.pipe(
      filter(() => this.notFirstRoute),
      map(e => this.urlService.checkUrlAndGetParametersIfExists(url, e) as unknown as RouteParameters),
      filter(v => Boolean(v) && this.urlService.checkQueryParams(queryParams)),
      tap(value => {
        const bindCallback = callback.bind(this.injector.get(base));
        bindCallback(new RouteContext(value, this.router.queryParams()));
      })
    );
  }
}
