import {State} from '../../state/state';
import {AbstractState} from '../../abstract/abstract.state';
import {filter, take} from 'rxjs/operators';
import {TestBed} from '@angular/core/testing';
import {SAS_ACTIONS$, SAS_ACTIONS_PROVIDERS} from '../actions.providers';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ActionResponse} from '../interfaces/action-response';
import {Injectable, Injector} from '@angular/core';
import {ActionsInjector} from '../actions-injector';
import {ActionType, AsyncAction} from './async-action';

interface TestStateInterface {
  id: string;
  name: string;
}

const defaults = {id: ''};

@Injectable()
@State({
  name: 'async_action_state_tests',
  defaults: {id: ''},
  pipes: [filter(state => Boolean(state.id))]
})
class TestState extends AbstractState<TestStateInterface> {
  @AsyncAction(ActionType.Set, 'set')
  setStateAction(): Observable<TestStateInterface> {
    return new BehaviorSubject({id: '1', name: 'ivan'}).pipe(take(1));
  }

  @AsyncAction(ActionType.Reset, 'reset')
  resetStateAction(): Observable<string> {
    return new BehaviorSubject('test_value').pipe(take(1));
  }

  @AsyncAction(ActionType.Patch, 'patch')
  patchStateAction(): Observable<Partial<TestStateInterface>> {
    return new BehaviorSubject({id: '2'}).pipe(take(1));
  }
}

describe('AsyncAction Decorator Without ActionsModule', () => {
  it('set state async action', done => {
    const state = new TestState();
    const sub = state.state$.subscribe(value => {
      expect({id: '1', name: 'ivan'}).toEqual(value)
      done();
    });
    state.setStateAction().subscribe();
    sub.unsubscribe();
  });

  it('patch state async action', done => {
    const state = new TestState();
    state.state$.subscribe(value => {
      expect({id: '2'}).toEqual(value)
      done();
    });
    state.patchStateAction().subscribe();
  })

  it('reset state async acton', done => {
    const state = new TestState();
    state.setStateAction().subscribe(() => {
      state.resetStateAction().subscribe(() => {
        expect(defaults).toEqual(state.snapshot);
        done();
      });
    });
  });
});

describe('AsyncAction Decorator With ActionsModule', () => {
  let actions$: Subject<ActionResponse<any>>;
  let state: TestState;
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [SAS_ACTIONS_PROVIDERS]});
    ActionsInjector.injector = TestBed.inject(Injector);
    actions$ = TestBed.inject(SAS_ACTIONS$);
    state = new TestState();
  });

  it('set state async action', done => {
    actions$.pipe(filter(r => r.name === 'set'), take(1)).subscribe(r => {
      console.log(r);
      expect({id: '1', name: 'ivan'}).toEqual(r.value)
      done();
    });
    state.setStateAction().subscribe();
  });

  it('patch state async action', done => {
    actions$.pipe(filter(r => r.name === 'patch'), take(1)).subscribe(r => {
      expect({id: '2'}).toEqual({id: r.value.id})
      done();
    });
    state.patchStateAction().subscribe();
  })

  it('reset state async acton', done => {
    state.setStateAction().subscribe(() => {
      actions$.pipe(filter(r => r.name === 'reset'), take(1)).subscribe(r => {
        expect(defaults).toEqual(r.value);
        done();
      });
      state.resetStateAction().subscribe();
    });
  });
});
