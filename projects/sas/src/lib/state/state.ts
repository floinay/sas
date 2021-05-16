import 'reflect-metadata';
import {updateMetadata} from './metadata-helpers/update-metadata';
import {StateCtor} from './types/state-ctor';
import {StateMeta} from './contracts/state-meta';


export function State<T>(meta: StateMeta<T>): (ctor: StateCtor<T>) => void {
  return (ctor: StateCtor<T>) => {
    updateMetadata(ctor.prototype, meta);
  };
}


