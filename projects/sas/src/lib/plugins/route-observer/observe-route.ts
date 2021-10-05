import {StateContract} from '../../state/contracts/state.contract';
import {addWatcher} from './route-observer-watchers';
import {ObserveRouteMethodType, QueryParams} from './route-listener.service';


export const ObserveRoute = (url: string, queryParams: QueryParams = {}) => {
  return (target: StateContract<any>, property: string, descriptor: PropertyDescriptor) => {
    addWatcher({url, callback: descriptor.value as ObserveRouteMethodType, queryParams});
  }
}
