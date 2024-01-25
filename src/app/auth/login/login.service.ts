import { Injectable, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BrowserSessionStorageService } from '../../browser-storage.service';
import { InformationBoxService } from '../../information-box/service/information-box.service';
import { InformationBoxComponent } from '../../information-box/information-box.component';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoginMinimizedDisplayed: boolean = false;
  @ViewChild(InformationBoxComponent) informationBoxComponent!: InformationBoxComponent;
  currentUserEmail: string;
  currentUserPassword: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private sessionStorageService: BrowserSessionStorageService,
    private informationBoxService: InformationBoxService
  ) {}

  checkUserCredentials(email: string, password: string): Observable<boolean> {
    return this.authService.login(email, password).pipe(
      map((isLogged) => {
        if (isLogged) {
          this.handleSuccessfulLogin(email, password);
          return true;
        } else {
          this.handleFailedLogin();
          return false;
        }
      })
    );
  }

  handleSuccessfulLogin(email: string, password: string) {
    this.isLoginMinimizedDisplayed = true;
    this.sessionStorageService.set('login', 'true');
    this.currentUserEmail = email;
    this.currentUserPassword = password;
    this.router.navigate(['/pokemons']);
  }

  handleFailedLogin() {
    this.informationBoxService.setText('Wrong email or password');
    this.informationBoxComponent.open();
  }

  handleLogout() {
    this.isLoginMinimizedDisplayed = false;
    this.sessionStorageService.set('login', 'false');
    this.authService.logout();
    this.currentUserEmail = '';
    this.currentUserPassword = '';
    this.router.navigate(['/login']);
  }
}
