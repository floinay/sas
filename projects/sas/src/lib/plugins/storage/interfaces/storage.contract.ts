import {DeepPartial} from '../../../types/deep-partial';
import {Observable} from 'rxjs';

export interface StorageContract<T> {
  get(name: string): T | undefined;

  set(name: string, value: T | DeepPartial<T>): void;
}

export interface AsyncStorageContract<T> {
  get(name: string): Observable<T | undefined>

  set(name: string, value: DeepPartial<T>): void;
}
