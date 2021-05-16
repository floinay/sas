import {State} from '../../projects/sas/src/lib/state/state';
import {Injectable} from '@angular/core';
import {AbstractState} from '../../projects/sas/src/lib/abstract/abstract.state';
import {filter} from 'rxjs/operators';

interface TestStateInterface {
  name: string;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
@State<TestStateInterface>({
  name: 'test',
  pipes: [
    filter(value => Boolean(value.id))
  ]
})
export class TestState extends AbstractState<TestStateInterface> {

}
