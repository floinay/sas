import {DeepPartial} from '../types/deep-partial';

interface IsObject {
  (item: any): boolean;
}

export const isObject: IsObject = (item: any): boolean => {
  return (item === Object(item) && !Array.isArray(item));
};

export function mergeDeep<T>(target: T, ...sources: Array<DeepPartial<T>>): T {
  if (!sources.length) {
    return target;
  }

  const result: T = target;

  if (isObject(result)) {
    const len: number = sources.length;

    for (let i = 0; i < len; i += 1) {
      const elm: DeepPartial<T> = sources[i];

      if (isObject(elm)) {
        for (const key in elm) {
          if (elm.hasOwnProperty(key)) {
            if (isObject(elm[key])) {
              if (!result[key] || !isObject(result[key])) {
                // @ts-ignore
                result[key] = {};
              }
              // @ts-ignore
              deepMerge(result[key], elm[key]);
            } else {
              if (Array.isArray(result[key]) && Array.isArray(elm[key])) {

                // @ts-ignore
                result[key] = Array.from(new Set(result[key].concat(elm[key])));
              } else {
                // @ts-ignore
                result[key] = elm[key];
              }
            }
          }
        }
      }
    }
  }

  return result;
}
