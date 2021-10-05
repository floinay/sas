import {State} from '../../projects/sas/src/lib/state/state';
import {Injectable} from '@angular/core';
import {AbstractState, Persistence} from '../../projects/sas/src/public-api';
import {filter} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {ObserveRoute} from '../../projects/sas/src/lib/plugins/route-observer/observe-route';
import {RouteContext} from '../../projects/sas/src/lib/plugins/route-observer/route-listener.service';

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
export class TestState extends AbstractState<TestStateInterface> {
  constructor() {
    super();
  }

  @ObserveRoute('/lazy', {test: '*'})
  fetch(context: RouteContext): Observable<any> {
    console.log(context);
    return of('qwe');
  }
}
