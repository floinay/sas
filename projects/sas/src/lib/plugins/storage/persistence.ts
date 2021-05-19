import {StateCtor} from '../../state/types/state-ctor';
import {getMetadata} from '../../state/metadata-helpers/get-metadata';
import {addFactory} from '../../state/metadata-helpers/factories';
import {StorageInjector} from './storage-injector';
import {DEFAULT_STORAGE} from './providers';
import {StorageContract} from './storage.contract';
import {Observable, timer} from 'rxjs';
import {addPipes} from '../../state/metadata-helpers/pipes';
import {debounce, map, switchMap, tap} from 'rxjs/operators';

interface PersistenceOptions {
  storage?: StorageContract;
  name?: string;
}

export function Persistence<T>({storage, name}: PersistenceOptions = {}) {
  return (ctor: StateCtor<any>) => {
    let factoryStarted = false;
    addFactory(ctor.prototype,
      (): Observable<any> => getStorage().get(getName()).pipe(tap(() => factoryStarted = true))
    );
    addPipes(ctor.prototype, [
      debounce(() => factoryStarted ? timer(0) : timer(100000)),
      switchMap(value => getStorage().set(getName(), value).pipe(map(() => value)))
    ]);


    const getStorage = (): StorageContract => {
      if (!storage) {
        storage = StorageInjector.injector?.get(DEFAULT_STORAGE);
      }

      if (!storage) {
        throw new Error('Add storage to @Persistence or import SasStoragePluginModule for use default storage');
      }
      return storage;
    }
    const getName = (): string => {
      if (!name) {
        const meta = getMetadata(ctor.prototype);
        name = meta.name;
      }
      return name;
    }
  }
}
