import { NgModule } from '@angular/core';
import { ObserveRouteService } from './services/observe-route.service';
import { getPreviousWatchers, WATCHERS$ } from './watchers/watchers';
import { RouterService } from './services/router.service';
import { ROUTER_SERVICE } from './providers';
import { getPreviousLeaveWatchers, LEAVE_WATCHERS$ } from './watchers/leave-watchers';
import { ObserveRouteLeaveService } from './services/observe-route-leave.service';


@NgModule({
  providers: [
    RouterService,
    {
      provide: ROUTER_SERVICE,
      useExisting: RouterService
    }
  ]
})
export class SasRouteObserverModule {
  constructor(observeRouteService: ObserveRouteService, observeRouteLeaveService: ObserveRouteLeaveService) {
    LEAVE_WATCHERS$.subscribe(value => {
      observeRouteLeaveService.watch(value).subscribe();
    });
    WATCHERS$.subscribe(value => {
      observeRouteService.watch(value).subscribe();
    });

    getPreviousWatchers().forEach(value => {
      observeRouteService.watch(value).subscribe();
    });
    getPreviousLeaveWatchers().forEach(value => {
      observeRouteLeaveService.watch(value).subscribe();
    });
  }
}
