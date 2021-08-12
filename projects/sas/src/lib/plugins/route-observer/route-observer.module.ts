import {APP_BOOTSTRAP_LISTENER, ComponentRef, NgModule} from '@angular/core';
import {ObserverInjectorService} from './observer-injector.service';


@NgModule({
  providers: [
    ObserverInjectorService,
    {
      provide: APP_BOOTSTRAP_LISTENER,
      multi: true,
      useValue: (c: ComponentRef<any>) => {
        // @ts-ignore
        window['c'] = c;
        // @ts-ignore
        // console.log(AppComponent.prototype.__annotations__);
        // console.log(c);
      }
    }
  ]
})
export class RouteObserverModule {
  constructor(observerInjector: ObserverInjectorService) {
  }
}
