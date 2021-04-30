import {StateContract} from '../decorators/state/contracts/state.contract';
import {BehaviorSubject, Observable} from 'rxjs';
import {DeepPartial} from '../types/deep-partial';
import {cloneAndMerge} from '../util/clone-and-merge';
import {createState} from '../decorators/state/metadata-helpers/create-state';
import {StateMeta} from '../decorators/state/contracts/state-meta';
import {getMetadata} from '../decorators/state/metadata-helpers/get-metadata';
import {Immutable} from '../types/immutable';
import {getPipes} from '../decorators/state/metadata-helpers/pipes';


export abstract class AbstractState<T> implements StateContract<T> {
  private meta: StateMeta<T> = getMetadata(this);
  private state: BehaviorSubject<T> = createState(this)

  get snapshot(): Immutable<T> {
    return this.state.getValue();
  }

  get state$(): Observable<T> {
    // @ts-ignore
    return this.state.asObservable().pipe(...getPipes(this));
  }

  patchState(patches: DeepPartial<T> | T): void {
    this.state.next(cloneAndMerge<T>(this.snapshot as T, patches));
  }

  resetState(): void {
    this.setState(this.meta.defaults as T);
  }

  setState(state: T): void {
    this.state.next(state);
  }
}
