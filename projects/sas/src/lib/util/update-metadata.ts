import { StateCtor } from '../types/state-ctor';
import { getMetadata } from './get-metadata';
import { SAS_METADATA_FACTORIES_KEY, SAS_METADATA_KEY } from '../constants';
import { StateFactory } from '../types/state-factory';
import { StateMetadata, StateOptions } from '../contracts/state-metadata';

export function updateMetadata(ctor: StateCtor<any>, updates: StateOptions<any>): void {
  const meta = getMetadata(ctor.prototype) || {} as StateMetadata<any>;
  if (updates.name) {
    meta.name = updates.name;
  }
  if (updates.defaults) {
    meta.defaults = updates.defaults;
  }
  if (updates.factory) {
    addFactory(ctor, updates.factory);
  }

  if (updates.pipes) {
    const previousPipes = meta.pipes || [];
    meta.pipes = [...previousPipes, ...updates.pipes];
  }
  Reflect.defineMetadata(SAS_METADATA_KEY, meta, ctor.prototype);
}

function addFactory(ctor: StateCtor<any>, factory: StateFactory<any>): void {
  const factories = Reflect.getMetadata(SAS_METADATA_FACTORIES_KEY, ctor.prototype) as StateFactory<any>[] || [];
  factories.push(factory);
  Reflect.defineMetadata(SAS_METADATA_FACTORIES_KEY, factories, ctor.prototype);
}
