import {NgModule} from '@angular/core';
import {ObserverInjectorService} from './observer-injector.service';
import {RouteListenerService} from './route-listener.service';
import {getPreviousWatchers, ROUTE_OBSERVER_WATCHERS$} from './route-observer-watchers';


@NgModule({
  providers: [
    ObserverInjectorService
  ]
})
export class RouteObserverModule {

  constructor(routeListenerService: RouteListenerService) {
    getPreviousWatchers().forEach(value => routeListenerService.watch(value).subscribe());
    ROUTE_OBSERVER_WATCHERS$.subscribe(value => routeListenerService.watch(value).subscribe());
  }
}
