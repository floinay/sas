import {addWatcher} from './route-observer-watchers';
import {ObserveRouteMethodType, QueryParams} from './services/route-listener.service';


export const ObserveRoute = (url: string, queryParams: QueryParams = {}) =>
  (target: any, property: string, descriptor: PropertyDescriptor) => {
    addWatcher({url, callback: descriptor.value as ObserveRouteMethodType, queryParams, base: target.constructor});
  }

