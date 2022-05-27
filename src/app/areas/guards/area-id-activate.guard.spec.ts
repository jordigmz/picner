import { TestBed } from '@angular/core/testing';

import { AreaIdActivateGuard } from './area-id-activate.guard';

describe('AreaIdActivateGuard', () => {
  let guard: AreaIdActivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AreaIdActivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
