import {APP_BOOTSTRAP_LISTENER, ComponentRef, NgModule} from '@angular/core';
import {ObserverInjectorService} from './observer-injector.service';
import {getWatchers} from './auto-fetch';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';


@NgModule({
  providers: [
    ObserverInjectorService,
    {
      provide: APP_BOOTSTRAP_LISTENER,
      multi: true,
      useFactory: () => (c: ComponentRef<any>) => {
        const watchers = getWatchers(c.instance);
        console.log(watchers, c.instance);
        if (watchers.length) {
          watchers.forEach((factory) => {
            factory(c.injector);
          })
        }
      }
    }
  ]
})
export class RouteObserverModule {
  constructor(observerInjector: ObserverInjectorService) {
  }
}
