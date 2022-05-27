import { TestBed } from '@angular/core/testing';

import { EditAreaDeactivateGuard } from './edit-area-deactivate.guard';

describe('EditAreaDeactivateGuard', () => {
  let guard: EditAreaDeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EditAreaDeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
