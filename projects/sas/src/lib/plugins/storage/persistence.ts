import {AsyncStorageContract, StorageContract} from './interfaces/storage.contract';

interface PersistenceOptions<T> {
  driver?: StorageContract<T> | AsyncStorageContract<T>;
}

export function Persistence() {

}
