import {StateFactory} from '../types/state-factory';
import {BehaviorSubject} from 'rxjs';
import {StateOptions} from '../contracts/state-metadata';

export const factory: StateFactory<any> = <T>(meta: StateOptions<T>) => {
  return new BehaviorSubject(meta.defaults as T);
}
