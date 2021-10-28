import {State} from '../../projects/sas/src/lib/state/state';
import {Injectable} from '@angular/core';
import { AbstractState, ObserveRouteLeave, Persistence, RouteContext } from '../../projects/sas/src/public-api';
import {filter} from 'rxjs/operators';
import {ObserveRoute} from '../../projects/sas/src/lib/plugins/route-observer/observe-route';
import {HttpClient} from '@angular/common/http';
import {LeaveRouteContext} from '../../projects/sas/src/lib/plugins/route-observer/services/context/leave-route-context';

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
  constructor(private httpClient: HttpClient) {
    super();
  }

  @ObserveRoute('/test/:p')
  fetch(context: RouteContext): void {
    console.log(context);
  }

  @ObserveRouteLeave('/lazy', {test: '2'})
  reset(context: LeaveRouteContext): void {
    console.log(context);
    this.resetState();
  }
}
