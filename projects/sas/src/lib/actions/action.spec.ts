import {State} from '../state/state';
import {AbstractState} from '../abstract/abstract.state';
import {Action} from './action';
import {filter} from 'rxjs/operators';

@State({name: 'test', defaults: '', pipes: [filter(state => Boolean(state))]})
class TestState extends AbstractState<string> {
  @Action()
  testAction() {
    this.ctx.setState('test action value');
  }

  testCallback() {
    this.setState('test');
  }
}

describe('Action Decorator Without Module', () => {
  it('action change state', done => {
    const state = new TestState();
    state.state$.subscribe(value => {
      expect('test action value').toEqual(value)
      done();
    });
    state.testAction();
  });

  it('action emit to module', () => {

  })
});
