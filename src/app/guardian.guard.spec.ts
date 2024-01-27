import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

// Import the custom guardianGuard from the specified file
import { guardianGuard } from './guardian.guard';

// Describe a test suite for the guardianGuard
describe('guardianGuard', () => {
  // Define a function executeGuard of type CanActivateFn, which runs the guardianGuard in an injection context
  const executeGuard: CanActivateFn = () =>
    TestBed.runInInjectionContext(() => guardianGuard());

  // Before each test, set up the testing module
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  // Test that executeGuard should exist and be truthy
  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
