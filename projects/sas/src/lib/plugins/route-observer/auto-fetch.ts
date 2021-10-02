import {Observable} from 'rxjs';
import {InjectionToken, Injector, Provider, Type} from '@angular/core';
import {StateContract} from '../../state';
import {AbstractState} from '../../abstract/abstract.state';
import {take} from 'rxjs/operators';

export interface HasFetch {
  fetch(): Observable<any>;
}

const META_WATCHERS_KEY = 'component_watchers';

type Factory = (injector: Injector) => any;

type Return = (ctor: any) => void;

export const AutoFetchDecorator = (state: any): Return => {
  return (ctor: any) => {
    addWatcher(ctor, (injector => injector.get(state).fetch().pipe(take(1)).subscribe()))
  }
}

const addWatcher = (ctor: any, factory: Factory) => {
  const watchers = getWatchers(ctor.prototype);
  watchers.push(factory);
  Reflect.defineMetadata(META_WATCHERS_KEY, watchers, ctor.prototype);
}

export const getWatchers = (prototype: any): Factory[] => Reflect.getMetadata(META_WATCHERS_KEY, prototype) || [];
