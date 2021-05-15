import {State} from './state';
import {AbstractState} from '../../abstract/abstract.state';
import {StatePipes} from './contracts/state-meta';
import {tap} from 'rxjs/operators';
import {getMetadata} from './metadata-helpers/get-metadata';
import {StateFactory} from './types/state-factory';
import {BehaviorSubject} from 'rxjs';
import {getFactories} from './metadata-helpers/factories';
import {getPipes} from './metadata-helpers/pipes';

const defaults = 'default';
const name = 'test_state';
const pipes: StatePipes<any> = [tap(() => 0)];
const factories: StateFactory<string>[] = [() => new BehaviorSubject('')];

@State({name, defaults, pipes, factory: factories[0]})
class TestState extends AbstractState<string> {

}

describe('StateDecorator', () => {
  const state = new TestState();
  const meta = getMetadata(state);
  const metaFactories = getFactories(state);
  const metaPipes = getPipes(state);
  it('metadata have name', () => expect(meta.name).toEqual(name));
  it('metadata have defaults', () => expect(meta.defaults).toEqual(defaults));
  it('metadata have pipes', () => expect(metaPipes).toEqual(pipes));
  it('metadata have factories', () => expect(factories).toEqual(metaFactories))
});
