import { TestBed } from '@angular/core/testing';
import { InformationBoxService } from './information-box.service';

// Describe a test suite for the InformationBoxService
describe('InformationBoxService', () => {
  // Declare a variable to hold the InformationBoxService instance
  let service: InformationBoxService;

  // Set up the test environment before each test
  beforeEach(() => {
    // Configure the TestBed
    TestBed.configureTestingModule({});
    // Create an instance of InformationBoxService and assign it to the service variable
    service = TestBed.inject(InformationBoxService);
  });

  // Test that the service has been created
  it('should be created', () => {
    // Verify that the service is truthy (i.e., it exists)
    expect(service).toBeTruthy();
  });
});
