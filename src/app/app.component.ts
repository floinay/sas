import {Component} from '@angular/core';
import {TestState} from '../state/test-state';
import {AutoFetch} from '../../projects/sas/src/lib/plugins/route-observer/auto-fetch';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AutoFetch()]
})
export class AppComponent {
  title = 'sas';

  constructor(state: TestState) {

    state.state$.subscribe(v => {
      console.log(v);
    });
  }
}
