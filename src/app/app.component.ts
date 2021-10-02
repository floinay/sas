import {Component} from '@angular/core';
import {TestState} from '../state/test-state';
import {AutoFetchDecorator} from '../../projects/sas/src/lib/plugins/route-observer/auto-fetch';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent {
  title = 'sas';

  constructor(state: TestState) {

    state.state$.subscribe(v => {
      console.log(v);
    });
  }
}
