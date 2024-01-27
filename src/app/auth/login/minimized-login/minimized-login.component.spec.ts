// Import the necessary modules and components
import { MinimizedLoginComponent } from './minimized-login.component';
import { LoginService } from '../login.service';
import { MinimizedLoginService } from './minimized-login.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { BrowserSessionStorageService } from '../../../browser-storage.service';

// Describe the tests for the MinimizedLoginComponent
describe('MinimizedLoginComponent', () => {
  // Define the variables to be used in the tests
  let component: MinimizedLoginComponent;
  let loginService: LoginService;
  let minimizedLoginService: MinimizedLoginService;
  let router: Router;
  let authService: jasmine.SpyObj<AuthService>;
  let sessionStorageService: jasmine.SpyObj<BrowserSessionStorageService>;

  // Before each test, initialize the services and components
  beforeEach(() => {
    loginService = new LoginService(router, authService, sessionStorageService);
    minimizedLoginService = new MinimizedLoginService();

    minimizedLoginService.isLoginMinimizedDisplayed = new BehaviorSubject(true);
    minimizedLoginService.userEmail = new BehaviorSubject('admin@pkm.com');

    component = new MinimizedLoginComponent(
      loginService,
      minimizedLoginService
    );

    component.ngOnInit(); // Initialize the component
  });

  // Test to check if the component initializes and subscribes to minimizedLoginService
  it('should initialize component and subscribe to minimizedLoginService', () => {
    const isLoginMinimizedDisplayed = true;
    const userEmail = 'admin@pkm.com';
  
    // Check if the component is initialized properly and subscribed to minimizedLoginService
    expect(component.isLoginMinimizedDisplayed).toBe(isLoginMinimizedDisplayed);
    expect(component.userEmail).toBe(userEmail);
  });

  // Test to check if the user can disconnect and handle logout
  it('should disconnect the user and handle logout', () => {
    // Spy on functions to check if they are called correctly
    spyOn(minimizedLoginService.isLoginMinimizedDisplayed, 'next');
    spyOn(minimizedLoginService.userEmail, 'next');
    spyOn(loginService, 'handleLogout');

    // Call the disconnect function
    component.disconnect();

    // Check if functions are called with the correct arguments
    expect(minimizedLoginService.isLoginMinimizedDisplayed.next).toHaveBeenCalledWith(false);
    expect(minimizedLoginService.userEmail.next).toHaveBeenCalledWith('anonymous');
    expect(loginService.handleLogout).toHaveBeenCalled();
  });
});
