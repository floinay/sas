import {OperatorFunction} from 'rxjs';
import {StateFactory} from '../types/state-factory';

export type StatePipe<T> = OperatorFunction<T, T>;
export type StatePipes<T> = StatePipe<T>[];

export interface StateMeta<T> {
  name: string;
  defaults?: T;
  pipes?: StatePipes<T>;
  factory?: StateFactory<T>;
}
