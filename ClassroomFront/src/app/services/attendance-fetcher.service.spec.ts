import { TestBed } from '@angular/core/testing';

import { AttendanceFetcherService } from './attendance-fetcher.service';

describe('AttendanceFetcherService', () => {
  let service: AttendanceFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
