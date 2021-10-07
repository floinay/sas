import {State} from '../../projects/sas/src/lib/state/state';
import {Injectable} from '@angular/core';
import {AbstractState, Persistence} from '../../projects/sas/src/public-api';
import {filter} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {ObserveRoute} from '../../projects/sas/src/lib/plugins/route-observer/observe-route';
import {RouteContext} from '../../projects/sas/src/lib/plugins/route-observer/services/route-listener.service';
import {HttpClient} from '@angular/common/http';

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
  fetch(context: RouteContext): Observable<any> {
    console.log(this.httpClient);
    this.resetState();
    this.patchState({name: '2'});
    console.log(this.snapshot);
    return of('qwe');
  }
}
