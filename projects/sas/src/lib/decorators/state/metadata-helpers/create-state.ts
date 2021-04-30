import {BehaviorSubject, of, ReplaySubject} from 'rxjs';
import {StateContract} from '../contracts/state.contract';
import {getFactories} from './factories';
import {getMetadata} from './get-metadata';
import {filter, switchMap, take} from 'rxjs/operators';

export const createState = <T>(state: StateContract<T>): BehaviorSubject<T> => {
  const factories = getFactories(state);
  const meta = getMetadata(state);
  const sub = new BehaviorSubject<T>(meta.defaults || {} as T);
  if (!factories.length && meta.defaults) {
  } else if (factories.length) {
    factories
      .reduce(
        (prev, current) => prev.pipe(switchMap(current)),
        of(meta.defaults)
      )
      .pipe(take(1), filter(value => Boolean(value)))
      .subscribe(value => sub.next(value as T));
  }

  return sub;
}
