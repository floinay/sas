import {StateContract} from '../../state/contracts/state.contract';
import {dispatchAction} from './actions-helpers';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

type AsyncActionType = (...args: any[]) => Observable<any>;

export enum ActionType {
  Set,
  Patch,
  Reset
}

export function AsyncAction(type: ActionType = ActionType.Set, name?: string) {
  return (target: StateContract<any>, property: string, descriptor: TypedPropertyDescriptor<AsyncActionType>) => {
    const original = descriptor.value as AsyncActionType;
    descriptor.value = function (...args: any[]) {
      return original.apply(this, args).pipe(tap((value) => {
        changeState(this as StateContract<any>, value, type);
        dispatchAction(this as StateContract<any>, property, name);
      }));
    }
  }
}

const changeState = (state: StateContract<any>, value: any, strategy: ActionType): void => {
  if (strategy === ActionType.Set) {
    state.ctx.setState(value);
  } else if (strategy === ActionType.Patch) {
    state.ctx.patchState(value);
  } else if (strategy === ActionType.Reset) {
    state.ctx.resetState();
  }
}
