import { TestBed } from '@angular/core/testing';

import { ObserveRouteLeaveService } from './observe-route-leave.service';

describe('ObserveRouteLeaveService', () => {
  let service: ObserveRouteLeaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObserveRouteLeaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
