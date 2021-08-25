import {AbstractRouteObserver, RouteStateObserveCallback} from './abstract-route-observer';
import {inject, InjectionToken, Injector} from '@angular/core';

export const routeObserve = (callback: RouteStateObserveCallback) => {
  return new InjectionToken(tokenName(), {
    factory: () => {
      const entity = new class extends AbstractRouteObserver {
      };
      entity.injector = inject(Injector);

      return entity;
    }
  });
};


const tokenName = (): string => {
  return 'Route State Observe token' + Math.random().toString(36).substr(2, 9);
};
