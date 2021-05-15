import {SAS_META_KEY} from '../constants';
import {StateMeta} from '../contracts/state-meta';
import {addFactory} from './factories';
import {StateContract} from '../contracts/state.contract';
import {addPipes} from './pipes';

export function updateMetadata(state: StateContract<any>, updates: Partial<StateMeta<any>>): void {
  const meta = Reflect.getMetadata(SAS_META_KEY, state) || {};
  if (updates.name) {
    meta.name = updates.name;
  }
  if (updates.defaults) {
    meta.defaults = updates.defaults;
  }
  if (updates.factory) {
    addFactory(state, updates.factory);
  }

  if (updates.pipes?.length) {
    addPipes(state, updates.pipes);
  }
  Reflect.defineMetadata(SAS_META_KEY, meta, state);
}


