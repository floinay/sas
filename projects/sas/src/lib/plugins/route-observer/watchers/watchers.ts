import {Subject} from 'rxjs';
import {RouteObserverWatcher} from '../services/observe-route.service';


const ROUTE_OBSERVER_WATCHERS = new Subject<RouteObserverWatcher>();
let MODULE_LOADED = false;
const PREVIOUS_WATCHERS: RouteObserverWatcher[] = [];
export const WATCHERS$ = ROUTE_OBSERVER_WATCHERS.asObservable();

export const addWatcher = (watcher: RouteObserverWatcher) => MODULE_LOADED ?
  ROUTE_OBSERVER_WATCHERS.next(watcher) :
  PREVIOUS_WATCHERS.push(watcher);

export const getPreviousWatchers = () => {
  MODULE_LOADED = true;
  return PREVIOUS_WATCHERS;
};
