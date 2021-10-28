import { Component, OnInit } from '@angular/core';
import { TestState } from '../../state/test-state';

@Component({
  selector: 'app-lazy-page',
  templateUrl: './lazy-page.component.html',
  styleUrls: ['./lazy-page.component.scss']
})
export class LazyPageComponent implements OnInit {

  constructor(private state: TestState) {
  }

  ngOnInit(): void {
  }

}
