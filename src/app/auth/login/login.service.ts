import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BrowserSessionStorageService } from '../../browser-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoginMinimizedDisplayed: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private sessionStorageService: BrowserSessionStorageService
  ) {}

  /**
   * Checks the user credentials by attempting to login with the provided email and password.
   *
   * @param {string} email - the user's email
   * @param {string} password - the user's password
   * @return {Observable<boolean>} an observable that emits a boolean indicating if the login was successful
   */
  checkUserCredentials(email: string, password: string): Observable<boolean> {
    return this.authService.login(email, password).pipe(
      map((isLogged) => {
        if (isLogged) {
          this.handleSuccessfulLogin(email);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  /**
   * Handles a successful login by setting flags and navigating to the /pokemons route.
   *
   * @param {string} email - the email of the logged in user
   * @return {void}
   */
  handleSuccessfulLogin(email: string): void {
    this.isLoginMinimizedDisplayed = true;
    this.sessionStorageService.set('userId', email);
    this.sessionStorageService.set('login', 'true');
    this.router.navigate(['/pokemons']);
  }

  /**
   * Handles the logout process by clearing the session storage, logging out the user,
   * and navigating to the login page.
   */
  handleLogout() {
    this.isLoginMinimizedDisplayed = false;
    this.sessionStorageService.clear();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
