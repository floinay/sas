import {StateContract} from '../contracts/state.contract';
import {BehaviorSubject, Observable} from 'rxjs';
import {DeepPartial} from '../types/deep-partial';
import {getMetadata} from '../util/get-metadata';
import {cloneAndMerge} from '../util/clone-and-merge';
import {cloneDeep} from '../util/clone-deep';
import {validateMetadata} from '../util/validate-metadata';
import {StateOptions} from '../contracts/state-metadata';


export abstract class AbstractState<T> implements StateContract<T> {
  private metadata: StateOptions<T> = getMetadata<T>(this) as StateOptions<T>;
  private state: BehaviorSubject<T> = new BehaviorSubject<T>(this.metadata?.defaults as T);

  get snapshot(): T {
    return this.state.getValue();
  }

  get state$(): Observable<T> {
    return this.state.asObservable();
  }

  patchState(patches: DeepPartial<T> | T): void {
    this.state.next(cloneAndMerge(this.snapshot, patches));
  }

  resetState(): void {
    this.setState(this.metadata.defaults as T);
  }

  setState(state: T): void {
    this.state.next(cloneDeep(state));
  }
}
