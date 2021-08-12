import {Injectable, InjectionToken, Injector, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

export const OBSERVER_INJECTOR_TOKENS$ = new Subject<InjectionToken<any>>();

@Injectable()
export class ObserverInjectorService implements OnDestroy {
  private sub = OBSERVER_INJECTOR_TOKENS$.subscribe(token => {
    this.injector.get(token);
    console.log(this.injector.get(token));
  });

  constructor(private injector: Injector) {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
