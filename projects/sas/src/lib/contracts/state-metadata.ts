import {OperatorFunction} from 'rxjs';
import {StateFactory} from '../types/state-factory';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface StateMetadata<T> {
  name: string;
  defaults: T;
  pipes: OperatorFunction<T, T>[];
  factory: StateFactory<T>;
}

export type  PartialStateMetadata<T> = WithOptional<StateMetadata<T>, 'defaults' | 'pipes' | 'factory'>;
