import {State} from '../../projects/sas/src/lib/state/state';
import {Injectable} from '@angular/core';
import {AbstractState} from '../../projects/sas/src/lib/abstract/abstract.state';
import {filter} from 'rxjs/operators';
import {Persistence} from '../../projects/sas/src/lib/plugins/storage/persistence';

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

}
