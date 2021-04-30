import { State } from './state';
import { AbstractState } from '../../abstract/abstract.state';
import { SAS_META_KEY } from './constants';
import { StateMeta, StatePipes } from './contracts/state-meta';
import { tap } from 'rxjs/operators';

const defaults = 'default';
const name = 'test_state';
const pipes: StatePipes<any> = [tap(() => 0)];

@State({name, defaults, pipes})
class TestState extends AbstractState<string> {

}

describe('StateDecorator', () => {
  const state = new TestState();
  const meta = Reflect.getMetadata(SAS_META_KEY, state) as StateMeta<any>;
  it('metadata have name', () => {
    expect(meta.name).toEqual(name);
  });

  it('metadata have defaults', () => {
    expect(meta.defaults).toEqual(defaults);
  });

  it('metadata have pipes', () => {
    expect(meta.pipes).toEqual(pipes);
  });
});
