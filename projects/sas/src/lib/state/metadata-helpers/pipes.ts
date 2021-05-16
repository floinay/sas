import {StatePipes} from '../contracts/state-meta';
import {StateContract} from '../contracts/state.contract';
import {SAS_META_PIPES_KEY} from '../constants';

export const addPipes = (state: StateContract<any>, pipes: StatePipes<any>): void => {
  Reflect.defineMetadata(SAS_META_PIPES_KEY, [...getPipes(state), ...pipes], state);
}

export const getPipes = <T>(state: StateContract<T>): StatePipes<T> => {
  return Reflect.getMetadata(SAS_META_PIPES_KEY, state) || [];
}
