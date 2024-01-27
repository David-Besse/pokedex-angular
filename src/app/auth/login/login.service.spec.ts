import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { BrowserSessionStorageService } from '../../browser-storage.service';
import { LoginService } from './login.service';

// Describe the test suite for the LoginService
describe('LoginService', () => {
  let service: LoginService;
  let authService: jasmine.SpyObj<AuthService>;
  let sessionStorageService: jasmine.SpyObj<BrowserSessionStorageService>;
  let router: Router;

  // Set up the test environment before each test
  beforeEach(() => {
    // Create spy objects for AuthService and BrowserSessionStorageService
    const authSpy = jasmine.createSpyObj('AuthService', ['login', 'logout']);
    const sessionSpy = jasmine.createSpyObj('BrowserSessionStorageService', [
      'set',
      'clear',
    ]);

    // Configure the TestBed with the necessary providers
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: AuthService, useValue: authSpy },
        { provide: BrowserSessionStorageService, useValue: sessionSpy },
        { provide: Router, useValue: { navigate: jasmine.createSpy() } },
      ],
    });

    // Inject the LoginService, AuthService, BrowserSessionStorageService, and Router for testing
    service = TestBed.inject(LoginService);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    sessionStorageService = TestBed.inject(
      BrowserSessionStorageService
    ) as jasmine.SpyObj<BrowserSessionStorageService>;
    router = TestBed.inject(Router) as Router;
  });

  // Test if the LoginService is created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test user credentials check and successful login handling
  it('should check user credentials and handle successful login', () => {
    const email = 'test@example.com';
    const password = 'password';
    authService.login.and.returnValue(of(true)); // Stub the login method to return true

    // Subscribe to the checkUserCredentials method and perform assertions on the result
    service.checkUserCredentials(email, password).subscribe((result) => {
      expect(result).toBeTrue();
      expect(service.isLoginMinimizedDisplayed).toBeTrue();
      expect(sessionStorageService.set).toHaveBeenCalledWith('userId', email);
      expect(sessionStorageService.set).toHaveBeenCalledWith('login', 'true');
      expect(router.navigate).toHaveBeenCalledWith(['/pokemons']);
    });
  });

  // Test logout handling
  it('should handle logout', () => {
    // Call the handleLogout method and perform assertions
    service.handleLogout();
    expect(service.isLoginMinimizedDisplayed).toBeFalse();
    expect(sessionStorageService.clear).toHaveBeenCalled();
    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
