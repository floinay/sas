import {Injectable} from '@angular/core';
import {StorageContract} from './storage.contract';
import {Observable} from 'rxjs';
import {StorageMap} from '@ngx-pwa/local-storage';

@Injectable()
export class IdbStorageService implements StorageContract {
  constructor(private storageMap: StorageMap) {
  }

  get(name: string): Observable<unknown> {
    return this.storageMap.get(name);
  }

  reset(name: string): Observable<void> {
    return this.storageMap.delete(name);
  }

  set(name: string, value: unknown): Observable<void> {
    return this.storageMap.set(name, value);
  }

}
