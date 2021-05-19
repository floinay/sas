import {Injector, NgModule} from '@angular/core';
import {StorageInjector} from './storage-injector';
import {SAS_DEFAULT_STORAGE_PROVIDER} from './providers';

@NgModule({providers: [SAS_DEFAULT_STORAGE_PROVIDER]})
export class SasStoragePluginModule {
  constructor(injector: Injector) {
    StorageInjector.injector = injector;
  }
}
