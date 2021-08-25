import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injector} from '@angular/core';

export type RouteStateObserveCallback = (injector: Injector, route: ActivatedRouteSnapshot) => Observable<any>;

export class AbstractRouteObserver implements CanActivate {
  callback!: RouteStateObserveCallback;
  public injector!: Injector;

  constructor() {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.callback(this.injector, route);

    return true;
  }

}
