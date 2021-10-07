import {NgModule} from '@angular/core';
import {ObserveRouteService} from './services/observe-route.service';
import {getPreviousWatchers, WATCHERS$} from './watchers/watchers';
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
export class AirRouteObserverModule {
  constructor(routeListenerService: ObserveRouteService) {
    getPreviousWatchers().forEach(value => routeListenerService.watch(value).subscribe());
    WATCHERS$.subscribe(value => routeListenerService.watch(value).subscribe());
  }
}
