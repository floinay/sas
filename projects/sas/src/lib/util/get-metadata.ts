import { StateContract } from '../contracts/state.contract';
import 'reflect-metadata';
import { SAS_METADATA_KEY } from '../constants';
import { StateMetadata } from '../contracts/state-metadata';

export function getMetadata<T>(state: StateContract<T>): StateMetadata<T> | undefined {
  return Reflect.getMetadata(SAS_METADATA_KEY, state);
}
