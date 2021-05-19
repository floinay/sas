import {Observable} from 'rxjs';

export interface StorageContract {
  set(name: string, value: unknown): Observable<void>;

  get(name: string): Observable<unknown>;

  reset(name: string): Observable<void>;
}
