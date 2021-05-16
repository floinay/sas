import {BehaviorSubject} from 'rxjs';
import {StateContext} from '../state/contracts/state-context';
import {StateMeta} from '../state/contracts/state-meta';
import {DeepPartial} from '../types/deep-partial';
import {cloneAndMerge} from './clone-and-merge';

export const buildStateContext = <T>(state: BehaviorSubject<T>, meta: StateMeta<T>): StateContext<T> => {
  return {
    patchState(patches: DeepPartial<T> | T): void {
      state.next(cloneAndMerge<T>(state.getValue() as T, patches));
    },
    setState(value: T): void {
      state.next(value);
    },
    resetState(): void {
      state.next(meta.defaults as T);
    }
  };
}
