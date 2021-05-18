import {State} from '../../state/state';
import {AbstractState} from '../../abstract/abstract.state';
import {Action} from './action';
import {filter, take} from 'rxjs/operators';
import {TestBed} from '@angular/core/testing';
import {SAS_ACTIONS$, SAS_ACTIONS_PROVIDERS} from '../actions.providers';
import {Subject} from 'rxjs';
import {ActionResponse} from '../interfaces/action-response';
import {Injectable, Injector} from '@angular/core';
import {ActionsInjector} from '../actions-injector';

@Injectable()
@State({name: 'action_test_state', defaults: '', pipes: [filter(state => Boolean(state))]})
class TestState extends AbstractState<string> {
  @Action()
  testAction() {
    this.ctx.setState('test action value');
  }

  testCallback() {
    this.setState('test');
  }
}

describe('Action Decorator Without ActionsModule', () => {
  it('action change state', done => {
    const state = new TestState();
    state.state$.subscribe(value => {
      expect('test action value').toEqual(value)
      done();
    });
    state.testAction();
  });
});

describe('Action Decorator With ActionsModule', () => {
  let actions$: Subject<ActionResponse<any>>;
  let state: TestState;
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [SAS_ACTIONS_PROVIDERS]});
    ActionsInjector.injector = TestBed.inject(Injector);
    actions$ = TestBed.inject(SAS_ACTIONS$);
    state = new TestState();
  });

  it('action change state', (done) => {
    const state = new TestState();
    actions$.pipe(filter(r => r.stateName === 'action_test_state'), take(1)).subscribe(r => {
      expect('test action value').toEqual(r.value);
      done();
    });
    state.testAction();
  })
});
