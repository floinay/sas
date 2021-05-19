import {InjectionToken, Provider} from '@angular/core';
import {IdbStorageService} from './drivers/idb/idb-storage.service';
import {StorageContract} from './storage.contract';

export const DEFAULT_STORAGE = new InjectionToken<StorageContract>('Sas state default storage');

export const SAS_DEFAULT_STORAGE_PROVIDER: Provider = {
  provide: DEFAULT_STORAGE,
  useClass: IdbStorageService
};
