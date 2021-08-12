import { TestBed } from '@angular/core/testing';

import { ObserverInjectorService } from './observer-injector.service';

describe('ObserverInjectorService', () => {
  let service: ObserverInjectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObserverInjectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
