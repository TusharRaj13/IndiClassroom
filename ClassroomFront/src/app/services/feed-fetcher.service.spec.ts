import { TestBed } from '@angular/core/testing';

import { FeedFetcherService } from './feed-fetcher.service';

describe('FeedFetcherService', () => {
  let service: FeedFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
