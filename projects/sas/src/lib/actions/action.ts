import {inject, InjectFlags} from '@angular/core';
import {SAS_ACTIONS$} from './actions.providers';
import {Subject} from 'rxjs';
import {ActionResponse} from './interfaces/action-response';
import {getMetadata} from '../state/metadata-helpers/get-metadata';
import {StateContract} from '../state/contracts/state.contract';

export const Action = (name?: string) => {
  return (target: any, property: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      name = name || defaultActionName(target, property);
      const actions = getActions();
      original.apply(this, args);
      const value = '';
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

let actions: Subject<ActionResponse<any>> | null;
const getActions = (): Subject<ActionResponse<any>> | null => {
  if (!actions) {
    try {
      actions = inject(SAS_ACTIONS$, InjectFlags.Optional);
    } catch (e) {
    }
  }

  return actions;
}
