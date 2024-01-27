import { TestBed } from '@angular/core/testing';
import {
  BrowserLocalStorageServerService,
  BrowserSessionStorageServerService,
} from './browser-storage-server.service';

// Test suite for BrowserLocalStorageServerService
describe('BrowserLocalStorageServerService', () => {
  let service: BrowserLocalStorageServerService;

  // Before each test, set up the TestBed configuration
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserLocalStorageServerService],
    });
    // Inject the BrowserLocalStorageServerService for each test
    service = TestBed.inject(BrowserLocalStorageServerService);
  });

  // Test to ensure the service is created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

// Test suite for BrowserSessionStorageServerService
describe('BrowserSessionStorageServerService', () => {
  let service: BrowserSessionStorageServerService;

  // Before each test, set up the TestBed configuration
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserSessionStorageServerService],
    });
    // Inject the BrowserSessionStorageServerService for each test
    service = TestBed.inject(BrowserSessionStorageServerService);
  });

  // Test to ensure the service is created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
