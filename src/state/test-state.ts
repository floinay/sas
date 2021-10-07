import {State} from '../../projects/sas/src/lib/state/state';
import {Injectable} from '@angular/core';
import {AbstractState, ObserveRouteLeave, Persistence} from '../../projects/sas/src/public-api';
import {filter} from 'rxjs/operators';
import {ObserveRoute} from '../../projects/sas/src/lib/plugins/route-observer/observe-route';
import {HttpClient} from '@angular/common/http';
import {RouteContext} from 'sas';
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

  @ObserveRoute('/lazy')
  fetch(context: RouteContext): void {
    console.log(this.httpClient);
    this.resetState();
    this.patchState({name: 'Lazy'});
  }

  @ObserveRouteLeave('/lazy', {test: '2'})
  reset(context: LeaveRouteContext): void {
    console.log(context);
    this.resetState();
  }
}
