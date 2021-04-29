import {State} from '../../projects/sas/src/lib/decorators/state';
import {Injectable} from '@angular/core';
import {AbstractState} from '../../projects/sas/src/lib/abstract/abstract.state';

interface TestStateInterface {
  name: string;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
@State({name: 'test'})
export class TestState extends AbstractState<TestStateInterface> {

}
