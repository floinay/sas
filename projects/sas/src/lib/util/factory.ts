import {StateFactory} from '../types/state-factory';
import {BehaviorSubject} from 'rxjs';
import {StateMetadata} from '../contracts/state-metadata';

export const factory: StateFactory<any> = <T>(meta: StateMetadata<T>) => {
  return new BehaviorSubject(meta.defaults as T);
}
