import {StateContract} from '../contracts/state.contract';

export type StateCtor<T> = Function & { prototype: StateContract<T> };
