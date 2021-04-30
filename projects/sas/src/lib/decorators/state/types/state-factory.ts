import {Observable} from 'rxjs';

export type StateFactory<T> = (value?: T) => Observable<T>
