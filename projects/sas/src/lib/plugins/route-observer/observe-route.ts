import {addWatcher} from './watchers/watchers';
import {ObserveRouteMethodType, QueryParams} from './services/observe-route.service';
import {addLeaveWatcher} from './watchers/leave-watchers';


export const ObserveRoute = (url: string, queryParams: QueryParams = {}) =>
  (target: any, property: string, descriptor: PropertyDescriptor) => {
    addWatcher({url, callback: descriptor.value as ObserveRouteMethodType, queryParams, base: target.constructor});
  };


export const ObserveRouteLeave = (url: string, queryParams: QueryParams = {}) =>
  (target: any, property: string, descriptor: PropertyDescriptor) => {
    addLeaveWatcher({url, callback: descriptor.value as ObserveRouteMethodType, queryParams, base: target.constructor});
  };
