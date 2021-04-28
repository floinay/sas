import {validateMetadata} from '../util/validate-metadata';
import {StateContract} from '../types/state.contract';
import {BehaviorSubject, Observable} from 'rxjs';
import {DeepPartial} from '../types/deep-partial';
import {FullStateMetadata, getMetadata} from '../util/get-metadata';
import {cloneAndMerge} from '../util/clone-and-merge';
import {cloneDeep} from '../util/clone-deep';

export abstract class AbstractState<T> implements StateContract<T> {
  private metadata: FullStateMetadata<T> = getMetadata<T>(this);
  private state = new BehaviorSubject<T>(this.metadata.default);

  get snapshot(): T {
    return this.state.getValue();
  }

  readonly state$!: Observable<T>;

  protected constructor() {
    validateMetadata(this);
  }

  patchState(patches: DeepPartial<T>): void {
    this.state.next(cloneAndMerge(this.snapshot, patches));
  }

  resetState(): void {
    this.setState(this.metadata.default);
  }

  setState(state: T): void {
    this.state.next(cloneDeep(state));
  }
}
