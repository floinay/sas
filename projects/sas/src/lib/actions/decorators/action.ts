import {SAS_ACTIONS$} from '../actions.providers';
import {Subject} from 'rxjs';
import {ActionResponse} from '../interfaces/action-response';
import {getMetadata} from '../../state/metadata-helpers/get-metadata';
import {StateContract} from '../../state/contracts/state.contract';
import {ActionsInjector} from '../actions-injector';

export const Action = (name?: string) => {
  return (target: StateContract<any>, property: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const self = this as StateContract<any>;
      name = name || defaultActionName(self, property);
      const actions = getActions();
      original.apply(this, args);
      const value = self.snapshot;
      if (actions) {
        actions.next({value, args, name: name as string})
      }

      return value;
    }
  }
}

const defaultActionName = (target: StateContract<any>, property: string): string => {
  const meta = getMetadata(target);
  return `${meta.name}.${property}`
}

let actions: Subject<ActionResponse<any>> | undefined;
const getActions = (): Subject<ActionResponse<any>> | undefined => {
  if (!actions) {
    actions = ActionsInjector.injector?.get(SAS_ACTIONS$);
  }

  return actions;
}
