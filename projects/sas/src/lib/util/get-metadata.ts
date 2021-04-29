import {StateContract} from '../contracts/state.contract';
import 'reflect-metadata';
import {PartialStateMetadata} from '../contracts/state-metadata';
import {SAS_METADATA_KEY} from '../constants';

export function getMetadata<T>(state: StateContract<T>): PartialStateMetadata<T> | undefined {
  return Reflect.getMetadata(SAS_METADATA_KEY, state);
}
