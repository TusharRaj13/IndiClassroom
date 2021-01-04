import { TestBed } from '@angular/core/testing';

import { NoticeFetcherService } from './notice-fetcher.service';

describe('NoticeFetcherService', () => {
  let service: NoticeFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticeFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
