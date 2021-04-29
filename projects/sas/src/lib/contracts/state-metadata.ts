import { OperatorFunction } from 'rxjs';
import { StateFactory } from '../types/state-factory';

export type StatePipes<T> = OperatorFunction<T, T>[];

export interface StateOptions<T> {
  name: string;
  defaults: T;
  pipes?: StatePipes<T>;
  factory?: StateFactory<T>;
}

export interface StateMetadata<T> {
  name: string;
  defaults: T;
  pipes: StatePipes<T>;
  factories: StateFactory<T>[];
}
