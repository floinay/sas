import {DeepPartial} from '../../types/deep-partial';

export interface StateContext<T> {
  setState(state: T): void;

  patchState(state: DeepPartial<T> | T): void;

  resetState(): void;
}
