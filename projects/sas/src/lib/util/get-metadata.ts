import {StateContract} from '../types/state.contract';
import 'reflect-metadata';

export interface FullStateMetadata<T> {
  name: string;
  default: T;
}

export function getMetadata<T>(state: StateContract<T>): FullStateMetadata<T> {
  return Reflect.getMetadata('sas_meta', state);
}
