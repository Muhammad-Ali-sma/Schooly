import { TestBed } from '@angular/core/testing';

import { GetQuestionsResolver } from './get-questions.resolver';

describe('GetQuestionsResolver', () => {
  let resolver: GetQuestionsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetQuestionsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
