import {Observable} from 'rxjs';
import {DeepPartial} from './deep-partial';


export interface StateContract<T> {
  readonly snapshot: T;
  readonly state$: Observable<T>;

  setState(state: T): void;

  patchState(state: Partial<T> | DeepPartial<T>): void;

  resetState(): void;
}
