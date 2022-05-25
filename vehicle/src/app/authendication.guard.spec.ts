import { TestBed } from '@angular/core/testing';

import { AuthendicationGuard } from './authendication.guard';

describe('AuthendicationGuard', () => {
  let guard: AuthendicationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthendicationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
