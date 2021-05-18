import {Observable} from 'rxjs';
import {StateContext} from './state-context';


export interface StateContract<T> extends StateContext<T> {
  readonly snapshot: T;
  readonly state$: Observable<T>;
  readonly ctx: StateContext<T>;
}
