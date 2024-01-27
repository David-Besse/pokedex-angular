import { TestBed } from '@angular/core/testing';

// Import the services to be tested
import {
  BrowserLocalStorageService,
  BrowserSessionStorageService,
} from './browser-storage.service';

// Describe a test suite for the BrowserLocalStorageService
describe('BrowserLocalStorageService', () => {
  let service: BrowserLocalStorageService;

  // Set up the testing environment before each test
  beforeEach(() => {
    // Configure the TestBed with the provider for BrowserLocalStorageService
    TestBed.configureTestingModule({
      providers: [BrowserLocalStorageService],
    });
    // Obtain an instance of BrowserLocalStorageService for testing
    service = TestBed.inject(BrowserLocalStorageService);
  });

  // Test that the BrowserLocalStorageService is created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

// Describe a test suite for the BrowserSessionStorageService
describe('BrowserSessionStorageService', () => {
  let service: BrowserSessionStorageService;

  // Set up the testing environment before each test
  beforeEach(() => {
    // Configure the TestBed with the provider for BrowserSessionStorageService
    TestBed.configureTestingModule({
      providers: [BrowserSessionStorageService],
    });
    // Obtain an instance of BrowserSessionStorageService for testing
    service = TestBed.inject(BrowserSessionStorageService);
  });

  // Test that the BrowserSessionStorageService is created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
