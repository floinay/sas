import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RouterService as RouterServiceContract } from '../interfaces/router-service';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { QueryParams } from './observe-route.service';

@Injectable()
export class RouterService implements RouterServiceContract {
  private baseFilter$ = this.router.events.pipe(
    filter((e) => e instanceof NavigationEnd)
  ) as Observable<NavigationEnd>;
  readonly onNavigationEnd$: Observable<string> = this.baseFilter$.pipe(map(e => {
    const url = e.urlAfterRedirects ?? e.url;
    return url.split('?')[0];
  }));

  queryParams(): QueryParams {
    return this.router.routerState.root.snapshot.queryParams;
  }

  constructor(private router: Router) {
  }


}
