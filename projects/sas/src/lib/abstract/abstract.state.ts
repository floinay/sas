import {StateContract} from '../state/contracts/state.contract';
import {BehaviorSubject, Observable} from 'rxjs';
import {DeepPartial} from '../types/deep-partial';
import {createState} from '../state/metadata-helpers/create-state';
import {StateMeta} from '../state/contracts/state-meta';
import {getMetadata} from '../state/metadata-helpers/get-metadata';
import {getPipes} from '../state/metadata-helpers/pipes';
import {Action} from '../actions/action';
import {StateContext} from '../state/contracts/state-context';
import {buildStateContext} from '../util/build-state-context';


export abstract class AbstractState<T> implements StateContract<T> {
  private readonly meta: StateMeta<T> = getMetadata(this);
  private readonly state: BehaviorSubject<T> = createState(this)
  protected readonly ctx: StateContext<T> = buildStateContext(this.state, this.meta);
  // @ts-ignore
  readonly state$: Observable<T> = this.state.asObservable().pipe(...getPipes(this));

  get snapshot(): T {
    return this.state.getValue();
  }

  @Action()
  patchState(patches: DeepPartial<T> | T): void {
    this.ctx.patchState(patches);
  }

  @Action()
  resetState(): void {
    this.ctx.resetState();
  }

  @Action()
  setState(state: T): void {
    this.ctx.setState(state);
  }
}
