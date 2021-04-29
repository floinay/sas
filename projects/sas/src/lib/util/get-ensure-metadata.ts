import {StateContract} from '../contracts/state.contract';
import {PartialStateMetadata, StateOptions} from '../contracts/state-metadata';
import {validateMetadata} from './validate-metadata';
import {factory} from './factory';
import {getMetadata} from './get-metadata';
import {SAS_METADATA_FACTORIES_KEY} from '../constants';
import {StateFactory} from '../types/state-factory';
import {BehaviorSubject} from 'rxjs';
import {switchMap} from 'rxjs/operators';

export function getEnsureMetadata<T>(state: StateContract<T>): StateOptions<T> {
  validateMetadata(state);
  const meta = getMetadata(state) as PartialStateMetadata<T>;
  const factories = Reflect.getMetadata(SAS_METADATA_FACTORIES_KEY, state) as StateFactory<T>[] || [];
  if (!meta.defaults) {
    meta.defaults = {} as T;
  }

  if (!factories.length) {
    meta.factory = factory;
  } else {
    meta.factory = <T>() => {
    }, () => this.defaults
  )
}
}

if (!meta.pipes) {
  meta.pipes = [];
}

return meta as StateOptions<T>;
}
