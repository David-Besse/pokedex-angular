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

  handleSuccessfulLogin(email: string) {
    this.isLoginMinimizedDisplayed = true;
    this.sessionStorageService.set('userId', email);
    this.sessionStorageService.set('login', 'true');
    this.router.navigate(['/pokemons']);
  }

  handleLogout() {
    this.isLoginMinimizedDisplayed = false;
    this.sessionStorageService.clear();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
