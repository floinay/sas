import {Inject, Injectable, Injector} from '@angular/core';
import {ROUTER_SERVICE} from '../providers';
import {RouterService} from '../interfaces/router-service';
import {isObservable, Observable} from 'rxjs';
import {auditTime, filter, map, take, tap} from 'rxjs/operators';
import {QueryParams, RouteObserverWatcher} from './observe-route.service';
import {UrlParserService} from './url-parser.service';
import {LeaveRouteContext} from './context/leave-route-context';

@Injectable({
  providedIn: 'root'
})
export class ObserveRouteLeaveService {
  private urlHistory: string[] = [];
  private queryParamsHistory: QueryParams[] = [];

  private get previousUrl(): string | undefined {
    return this.urlHistory[this.urlHistory.length - 2];
  }

  private get previousQueryParams(): QueryParams | undefined {
    return this.queryParamsHistory[this.urlHistory.length - 2];
  }

  private get notFirstRoute(): boolean {
    return Boolean(this.previousUrl !== undefined && this.previousQueryParams !== undefined);
  }

  constructor(@Inject(ROUTER_SERVICE) readonly router: RouterService,
              private urlService: UrlParserService,
              private injector: Injector) {
    this.router.onNavigationEnd$.subscribe((url) => {
      this.urlHistory.push(url);
      this.queryParamsHistory.push(this.router.queryParams());
    });
  }

  watch({url, callback, queryParams, base}: RouteObserverWatcher): Observable<any> {
    return this.router.onNavigationEnd$.pipe(auditTime(1),
      filter(() => this.notFirstRoute),
      map(() => {
        if (this.previousUrl) {
          const previousRouteParams = this.urlService.checkUrlAndGetParametersIfExists(url, this.previousUrl);
          const previousQueryParams = this.urlService.checkQueryParams(queryParams, this.previousQueryParams);
          if (previousQueryParams && previousRouteParams) {
            return previousRouteParams;
          }
        }

        return false;
      }),
      filter(v => Boolean(v)),
      tap(value => {
        const bindCallback = callback.bind(this.injector.get(base));
        const response = bindCallback(new LeaveRouteContext(
            this.urlService.checkUrlAndGetParametersIfExists(url,
              this.urlHistory[this.urlHistory.length - 1]) || {},
            this.router.queryParams(), this.previousQueryParams || {},
            this.previousUrl || '', value || {}
          )
        );
        if (isObservable(response)) {
          response.subscribe();
        }
      })
    );
  }
}
