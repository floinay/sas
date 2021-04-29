import 'reflect-metadata';
import {PartialStateMetadata} from '../contracts/state-metadata';
import {updateMetadata} from '../util/update-metadata';
import {StateCtor} from '../types/state-ctor';


export function State<T>(meta: PartialStateMetadata<T>) {
  return function (ctor: StateCtor<T>) {
    if (!meta.defaults) {
      meta.defaults = {} as T;
    }
    updateMetadata(ctor, meta);
  };
}


