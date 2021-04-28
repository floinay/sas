import {StateContract} from '../types/state.contract';
import {getMetadata} from './get-metadata';

export const validateMetadata = (state: StateContract<any>): void => {
  if (!Boolean(getMetadata(state))) {
    throw new Error('State metadata not defined, please add @State decorator')
  }
}
