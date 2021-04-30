import {StateContract} from '../contracts/state.contract';
import 'reflect-metadata';
import {SAS_META_KEY} from '../constants';
import {StateMeta} from '../contracts/state-meta';

export const getMetadata = <T>(state: StateContract<T>): StateMeta<T> => {
  const meta = Reflect.getMetadata(SAS_META_KEY, state);
  if (!Boolean(meta)) {
    throw new Error('State metadata not defined, please add @State decorator')
  }

  return meta;
}
