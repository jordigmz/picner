import { TestBed } from '@angular/core/testing';

import { MongoIdGuard } from './mongo-id.guard';

describe('MongoIdGuard', () => {
  let guard: MongoIdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MongoIdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
