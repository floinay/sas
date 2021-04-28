import {State} from '../../projects/sas/src/lib/decorators/state';
import {Injectable} from '@angular/core';

@State({name: 'test'})
@Injectable({
  providedIn: 'root'
})
export class TestState {

}
