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
    this.state.state$.subscribe(v => {
      console.log(v);
    });
    // this.state.setState({name: 'test', id: 2});
    // this.state.patchState({name: 'test2'})
  }
}
