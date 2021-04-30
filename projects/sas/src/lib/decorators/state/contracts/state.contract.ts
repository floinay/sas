import {Observable} from 'rxjs';
import {DeepPartial} from '../../../types/deep-partial';
import {Immutable} from '../../../types/immutable';


export interface StateContract<T> {
  readonly snapshot: Immutable<T>;
  readonly state$: Observable<Immutable<T>>;

  setState(state: T): void;

  patchState(state: DeepPartial<T> | T): void;

  resetState(): void;
}
