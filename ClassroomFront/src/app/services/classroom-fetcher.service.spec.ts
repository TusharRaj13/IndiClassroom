import { TestBed } from '@angular/core/testing';

import { ClassroomFetcherService } from './classroom-fetcher.service';

describe('ClassroomFetcherService', () => {
  let service: ClassroomFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassroomFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
