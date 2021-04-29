import { State } from './state';
import { AbstractState } from '../abstract/abstract.state';
import { SAS_METADATA_KEY } from '../constants';
import { StateOptions, StatePipes } from '../contracts/state-metadata';
import { tap } from 'rxjs/operators';

const defaults = 'default';
const name = 'test_state';
const pipes: StatePipes<any> = [tap(() => 0)];

@State({name, defaults, pipes})
class TestState extends AbstractState<string> {

}

describe('StateDecorator', () => {
  const state = new TestState();
  const meta = Reflect.getMetadata(SAS_METADATA_KEY, state) as StateOptions<any>;
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
