import 'reflect-metadata';
import { updateMetadata } from '../util/update-metadata';
import { StateCtor } from '../types/state-ctor';
import { StateOptions } from '../contracts/state-metadata';


export function State<T>(meta: StateOptions<T>): (ctor: StateCtor<T>) => void {
  return (ctor: StateCtor<T>) => {
    if (!meta.defaults) {
      meta.defaults = {} as T;
    }
    updateMetadata(ctor, meta);
  };
}


