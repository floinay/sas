import {Inject, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ActionResponse} from './interfaces/action-response';
import {filter} from 'rxjs/operators';
import {SAS_ACTIONS$} from './actions.providers';

@Injectable()
export class ActionsListenerService {
  constructor(@Inject(SAS_ACTIONS$) readonly actions$: Subject<ActionResponse<any>>) {
  }

  listen<T>(name: string): Observable<ActionResponse<T>>;
  listen(): Observable<any>;
  listen<T>(name?: string): Observable<T>;
  listen(name?: string): any {
    if (name) {
      return this.actions$.asObservable().pipe(filter((a) => a.name === name));
    }
    return this.actions$.asObservable();
  }


}
