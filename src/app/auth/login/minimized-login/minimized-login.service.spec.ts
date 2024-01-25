import { TestBed } from '@angular/core/testing';

import { MinimizedLoginService } from './minimized-login.service';

describe('MinimizedLoginService', () => {
  let service: MinimizedLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinimizedLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
