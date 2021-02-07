import { TestBed } from '@angular/core/testing';

import { QuizFetcherService } from './quiz-fetcher.service';

describe('QuizFetcherService', () => {
  let service: QuizFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
