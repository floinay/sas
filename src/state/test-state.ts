import {State} from '../../projects/sas/src/lib/state/state';
import {Injectable} from '@angular/core';
import {AbstractState, Persistence} from '../../projects/sas/src/public-api';
import {filter} from 'rxjs/operators';
import {HasFetch} from '../../projects/sas/src/lib/plugins/route-observer/auto-fetch';
import {Observable, observable, of} from 'rxjs';

interface TestStateInterface {
  name: string;
  id: number;
}

@Persistence()
@State<TestStateInterface>({
  name: 'app_state',
  pipes: [
    filter(value => Boolean(value))
  ]
})
@Injectable({
  providedIn: 'root',
})
export class TestState extends AbstractState<TestStateInterface> implements HasFetch {
  constructor() {
    super();
  }
  
  fetch(): Observable<any> {
    console.log('qweqw');
    return of('qwe');
  }

}
