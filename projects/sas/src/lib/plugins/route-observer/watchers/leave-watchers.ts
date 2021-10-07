import {Subject} from 'rxjs';
import {RouteObserverWatcher} from '../services/observe-route.service';

const OBSERVE_ROUTE_LEAVE_WATCHERS = new Subject<RouteObserverWatcher>();
let PREVIOUS_WATCHERS_LOADED = false;
const PREVIOUS_WATCHERS: RouteObserverWatcher[] = [];
export const LEAVE_WATCHERS$ = OBSERVE_ROUTE_LEAVE_WATCHERS.asObservable();

export const addLeaveWatcher = (watcher: RouteObserverWatcher) => PREVIOUS_WATCHERS_LOADED ?
  OBSERVE_ROUTE_LEAVE_WATCHERS.next(watcher) :
  PREVIOUS_WATCHERS.push(watcher);

export const getPreviousLeaveWatchers = () => {
  PREVIOUS_WATCHERS_LOADED = true;
  return PREVIOUS_WATCHERS;
};
