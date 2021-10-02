import { Component, OnInit } from '@angular/core';
import {AutoFetchDecorator} from '../../../projects/sas/src/lib/plugins/route-observer/auto-fetch';
import {TestState} from '../../state/test-state';

@Component({
  selector: 'app-route-component',
  templateUrl: './route-component.component.html',
  styleUrls: ['./route-component.component.scss']
})
// @AutoFetchDecorator(TestState)
export class RouteComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
