import 'reflect-metadata';

export interface StateMetadata<T> {
  name: string;
  default?: T;
}

export function State<T>(meta: StateMetadata<T>) {
  return function (ctor: Function) {
    if (!meta.default) {
      meta.default = {} as T;
    }
    Reflect.defineMetadata('sas_meta', meta, ctor);
  };
}


