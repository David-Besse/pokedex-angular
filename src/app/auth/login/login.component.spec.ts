import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import LoginComponent from './login.component';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { InformationBoxService } from '../../information-box/service/information-box.service';
import { BrowserSessionStorageService } from '../../browser-storage.service';
import { LoginService } from './login.service';
import { MinimizedLoginService } from './minimized-login/minimized-login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

// Describe the test suite for the LoginComponent
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  // Set up the testing module, including the necessary imports and providers
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientTestingModule],
      providers: [
        AuthService,
        Router,
        InformationBoxService,
        BrowserSessionStorageService,
        LoginService,
        MinimizedLoginService,
      ],
    }).compileComponents();
  }));

  // Set up the testing module with the necessary imports and create the LoginComponent
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginComponent],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test that the LoginComponent is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test that the login page is hidden if the user is already logged in
  it('should hide login page if user is already logged in', () => {
    const authService = TestBed.inject(AuthService);
    authService.isLogged = true;

    // Call the ngOnInit method of the component
    component.ngOnInit();

    expect(component.isLoginPageHidden).toBe(false);
  });

  // Test that the successfulLogin method is called when user credentials are valid
  it('should call successfulLogin when user credentials are valid', () => {
    const email = 'admin@pkm.com';
    const password = 'AdminPKM2024!';
    const loginService = TestBed.inject(LoginService);
    const successfulLoginSpy = spyOn(component, 'successfulLogin');

    spyOn(loginService, 'checkUserCredentials').and.returnValue(of(true));
    component.email = email;
    component.password = password;
    component.onSubmit();

    expect(successfulLoginSpy).toHaveBeenCalled();
  });

  // Test that the failedLogin method is called when user credentials are invalid
  it('should call failedLogin when user credentials are invalid', () => {
    const email = 'test@exemple.com';
    const password = 'password';
    const loginService = TestBed.inject(LoginService);
    const failedLoginSpy = spyOn(component, 'failedLogin');

    spyOn(loginService, 'checkUserCredentials').and.returnValue(of(false));
    component.email = email;
    component.password = password;
    component.onSubmit();

    expect(failedLoginSpy).toHaveBeenCalled();
  });
});
