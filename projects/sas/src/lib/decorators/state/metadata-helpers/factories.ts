import {StateFactory} from '../types/state-factory';
import {SAS_META_FACTORIES_KEY} from '../constants';
import {StateContract} from '../contracts/state.contract';

export const addFactory = (state: StateContract<any>, factory: StateFactory<any>): void => {
  const factories = getFactories(state);
  factories.push(factory);
  Reflect.defineMetadata(SAS_META_FACTORIES_KEY, factories, state);
}

export const getFactories = <T>(state: StateContract<T>): StateFactory<T>[] => {
  return Reflect.getMetadata(SAS_META_FACTORIES_KEY, state) as StateFactory<any>[] || [];
}
