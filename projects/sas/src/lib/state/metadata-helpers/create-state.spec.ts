import {StateFactory} from '../types/state-factory';
import {of} from 'rxjs';
import {State} from '../state';
import {AbstractState} from '../../abstract/abstract.state';
import {take} from 'rxjs/operators';

const defaults = 'default';
const factoryValue = 'first value';
const name = 'test_state';
const factory: StateFactory<string> = () => of(factoryValue);

@State({name, factory})
class TestState extends AbstractState<string> {

}

@State({name, defaults, factory})
class TestStateWithDefaultValueAndFactory extends AbstractState<string> {

}

@State({name: name, defaults})
class TestStateDefaultValueOnly extends AbstractState<string> {

}

describe('createState', () => {
  it('has factory without default value and start is factory value', (done) => {
    const state = new TestState();
    expect(factoryValue).toEqual(state.snapshot);
    state.state$.pipe(take(1)).subscribe((result) => {
      expect(factoryValue).toEqual(result);
      done();
    });
  })
  it('has factory with default value and start is factory value', (done) => {
    const state = new TestStateWithDefaultValueAndFactory();
    expect(factoryValue).toEqual(state.snapshot);
    state.state$.pipe(take(1)).subscribe((result) => {
      expect(factoryValue).toEqual(result);
      done();
    })
  });
  it('has default value start with default value', (done) => {
    const state = new TestStateDefaultValueOnly();
    expect(defaults).toEqual(state.snapshot);
    state.state$.pipe(take(1)).subscribe(result => {
      expect(defaults).toEqual(result);
      done();
    })
  })
});
