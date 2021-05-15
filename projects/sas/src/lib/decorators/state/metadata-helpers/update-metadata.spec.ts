import {updateMetadata} from './update-metadata';
import {AbstractState} from '../../../abstract/abstract.state';
import {StateFactory} from '../types/state-factory';
import {of} from 'rxjs';
import {StatePipes} from '../contracts/state-meta';
import {tap} from 'rxjs/operators';
import {getMetadata} from './get-metadata';
import {getPipes} from './pipes';
import {getFactories} from './factories';

class TestState extends AbstractState<string> {

}

const Prototype = TestState.prototype;

describe('update metadata', () => {
  const name = '1';
  const defaults = 'defaults';
  const factory: StateFactory<string> = () => of('1')
  const pipes: StatePipes<string> = [tap(() => '1')];
  updateMetadata(Prototype, {name: name, defaults, factory, pipes})
  updateMetadata(Prototype, {pipes, factory});
  const meta = getMetadata<string>(Prototype);
  it('has name', () => expect(name).toEqual(meta.name));
  it('has defaults', () => expect(defaults).toEqual(meta.defaults as string));
  it('has pipes', () => expect([...pipes, ...pipes]).toEqual(getPipes(Prototype)));
  it('has factory', () => expect([factory, factory]).toEqual(getFactories(Prototype)));
});
