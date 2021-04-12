import { TestBed } from '@angular/core/testing';

import { AuthGuardLogInActivateGuard } from './auth-guard-log-in-activate.guard';

describe('AuthGuardLogInActivateGuard', () => {
  let guard: AuthGuardLogInActivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardLogInActivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
