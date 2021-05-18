import {StateContract} from '../../state/contracts/state.contract';
import {getMetadata} from '../../state/metadata-helpers/get-metadata';
import {Subject} from 'rxjs';
import {ActionResponse} from '../interfaces/action-response';
import {ActionsInjector} from '../actions-injector';
import {SAS_ACTIONS$} from '../actions.providers';

export const defaultActionName = (target: StateContract<any>, property: string): string => {
  const meta = getMetadata(target);
  return `${meta.name}.${property}`
}

let actions: Subject<ActionResponse<any>> | undefined;
export const getActions = (): Subject<ActionResponse<any>> | undefined => {
  if (!actions) {
    actions = ActionsInjector.injector?.get(SAS_ACTIONS$);
  }

  return actions;
}


export const dispatchAction = (target: StateContract<any>, property: string, name?: string): void => {
  const actions = getActions();
  const value = target.snapshot;
  const meta = getMetadata(target);
  if (actions) {
    actions.next({value, stateName: meta.name, name: name || defaultActionName(target, property)})
  }
}
