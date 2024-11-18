import { TestBed } from '@angular/core/testing';

import { GreenpointsService } from './greenpoints.service';

describe('GreenpointsService', () => {
  let service: GreenpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GreenpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
