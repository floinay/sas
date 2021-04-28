import {cloneDeep} from './clone-deep';
import {mergeDeep} from './merge-deep';
import {DeepPartial} from '../types/deep-partial';

export function cloneAndMerge<T>(source: T, merge: DeepPartial<T>): T {
  return mergeDeep(cloneDeep(source), merge);
}
