import {NgModule} from '@angular/core';
import {RouteListenerService} from './services/route-listener.service';
import {getPreviousWatchers, ROUTE_OBSERVER_WATCHERS$} from './route-observer-watchers';
import {RouterService} from './services/router.service';
import {ROUTER_SERVICE} from './providers';


@NgModule({
  providers: [
    RouterService,
    {
      provide: ROUTER_SERVICE,
      useExisting: RouterService
    }
  ]
})
export class RouteObserverModule {
  constructor(routeListenerService: RouteListenerService) {
    getPreviousWatchers().forEach(value => routeListenerService.watch(value).subscribe());
    ROUTE_OBSERVER_WATCHERS$.subscribe(value => routeListenerService.watch(value).subscribe());
  }
}
