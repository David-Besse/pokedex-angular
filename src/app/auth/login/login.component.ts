import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { InformationBoxService } from '../../information-box/service/information-box.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { BrowserSessionStorageService } from '../../browser-storage.service';
import { LoginService } from './login.service';
import { MinimizedLoginService } from './minimized-login/minimized-login.service';
import { InformationBoxComponent } from '../../information-box/information-box.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, InformationBoxComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent implements OnInit {
  @Input() email: string = '';
  @Input() password: string = '';
  isLoginPageHidden: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private informationBoxService: InformationBoxService,
    private sessionStorageService: BrowserSessionStorageService,
    private loginService: LoginService,
    private minimizedLoginService: MinimizedLoginService
  ) {}

  ngOnInit(): void {
    const userId = this.sessionStorageService.get('userId');
    const isUserConnected = this.sessionStorageService.get('login');

    if (isUserConnected === 'true' && userId) {
      this.authService.isLogged = true;
      this.isLoginPageHidden = true;
      this.minimizedLoginService.isLoginMinimizedDisplayed.next(true);
      this.minimizedLoginService.userEmail.next(userId);
      this.router.navigate(['/pokemons']);
    }
  }

  onSubmit() {
    this.loginService
      .checkUserCredentials(this.email, this.password)
      .subscribe((isLogged) => {
        isLogged ? this.successfulLogin() : this.failedLogin();
      });
  }

  successfulLogin() {
    this.isLoginPageHidden = true;
    this.minimizedLoginService.isLoginMinimizedDisplayed.next(true);
    this.minimizedLoginService.userEmail.next(this.email);
  }

  failedLogin() {
    this.informationBoxService.open('Wrong email or password');
    this.email = '';
    this.password = '';
  }
}
