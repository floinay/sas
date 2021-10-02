import {cloneDeep} from './clone-deep';
import {merge} from 'lodash-es';
import {DeepPartial} from '../types/deep-partial';

export function cloneAndMerge<T>(source: T, data: DeepPartial<T>): T {
  return merge(cloneDeep(source), data);
}
