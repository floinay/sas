import {InjectionToken, Provider} from '@angular/core';
import {Subject} from 'rxjs';
import {ActionResponse} from './interfaces/action-response';

const ACTIONS_SUBJECT = new Subject();

export const SAS_ACTIONS$ = new InjectionToken<Subject<ActionResponse<any>>>('Sas actions');

export const SAS_ACTIONS_PROVIDERS: Provider[] = [
  {
    provide: SAS_ACTIONS$,
    useValue: ACTIONS_SUBJECT
  }
];


