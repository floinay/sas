import {Component} from '@angular/core';
import {TestState} from '../state/test-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sas';

  constructor(private state: TestState) {
    console.log(state);
  }
}
