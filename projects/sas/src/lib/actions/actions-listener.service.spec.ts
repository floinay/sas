import {TestBed} from '@angular/core/testing';

import {ActionsListenerService} from './actions-listener.service';
import {SAS_ACTIONS$, SAS_ACTIONS_PROVIDERS} from './actions.providers';
import {Subject} from 'rxjs';
import {ActionResponse} from './interfaces/action-response';
import {take} from 'rxjs/operators';

describe('ActionsListenerService', () => {
  let service: ActionsListenerService;
  let actions$: Subject<ActionResponse<any>>;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [ActionsListenerService, SAS_ACTIONS_PROVIDERS]});
    service = TestBed.inject(ActionsListenerService);
    actions$ = TestBed.inject(SAS_ACTIONS$);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('listen all working', (done) => {
    const action = {name: 'test', value: '', stateName: 'test'};
    service.listen().pipe(take(1)).subscribe(value => {
      expect(action).toEqual(value);
      done();
    });
    actions$.next(action)
  });
  it('listen by name working', (done) => {
    const action: ActionResponse<number> = {name: 'test', value: 0, stateName: 'test'};
    const wrongNameAction = {name: 'wrong_name_test', value: '', stateName: 'test'};

    service.listen<number>(action.name).pipe(take(1)).subscribe(value => {
      expect(action).toEqual(value);
      done();
    });

    actions$.next(wrongNameAction);
    actions$.next(action);
  });
});
