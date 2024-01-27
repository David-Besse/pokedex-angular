import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

// Describe the test suite for AuthService
describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  // Set up the testing environment before each test
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import the HttpClientTestingModule
      providers: [AuthService], // Provide the AuthService
    });
    authService = TestBed.inject(AuthService); // Get an instance of the AuthService
    httpTestingController = TestBed.inject(HttpTestingController); // Get an instance of the HttpTestingController
  });

  // Clean up the testing environment after each test
  afterEach(() => {
    httpTestingController.verify();
  });

  // Test for the behavior of the login method
  it('should set isLogged to true when login is successful', () => {
    const mockUsers = [{ email: 'test@example.com', password: 'password' }];
    const givenEmail = 'test@example.com';
    const givenPassword = 'password';

    // Call the login method with given email and password
    authService.login(givenEmail, givenPassword).subscribe((isLogged) => {
      // Verify that the login is successful
      expect(isLogged).toBeTrue();
      expect(authService.isLogged).toBeTrue();
    });

    // Expect a single HTTP request to a specific URL and mock the response
    const req = httpTestingController.expectOne(
      `http://localhost:3000/users?email=${givenEmail}`
    );
    req.flush(mockUsers); // Provide mockUsers as the response body
  });

  // Test for the behavior of the logout method
  it('should set isLogged to false when logout is called', () => {
    // Set isLogged to true and call the logout method
    authService.isLogged = true;
    authService.logout();
    // Verify that isLogged is false after calling the logout method
    expect(authService.isLogged).toBeFalse();
  });
});
