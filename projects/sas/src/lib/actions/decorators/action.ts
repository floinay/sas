import {StateContract} from '../../state/contracts/state.contract';
import {dispatchAction} from './actions-helpers';

export const Action = (name?: string) => {
  return (target: StateContract<any>, property: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const res = original.apply(this, args);
      dispatchAction(this as StateContract<any>, property, name);
      return res;
    }
  }
}
