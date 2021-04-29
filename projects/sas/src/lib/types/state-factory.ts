export type StateFactory<T> = (value?: T) => T | Promise<T>
