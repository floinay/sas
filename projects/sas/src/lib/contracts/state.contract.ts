import {Observable} from 'rxjs';
import {DeepPartial} from '../types/deep-partial';


export interface StateContract<T> {
  readonly snapshot: T;
  readonly state$: Observable<T>;

  setState(state: T): void;

  patchState(state: DeepPartial<T> | T): void;

  resetState(): void;
}
