import { TestBed } from '@angular/core/testing';
import { MinimizedLoginService } from './minimized-login.service';

// Describe a test suite for the MinimizedLoginService
describe('MinimizedLoginService', () => {
  let service: MinimizedLoginService;

  // Before each test, set up the testing module
  beforeEach(() => {
    TestBed.configureTestingModule({});
    // Get an instance of the MinimizedLoginService using TestBed.inject
    service = TestBed.inject(MinimizedLoginService);
  });

  // Test that the service is created
  it('should be created', () => {
    // Assert that the service is truthy (i.e., it exists)
    expect(service).toBeTruthy();
  });
});
