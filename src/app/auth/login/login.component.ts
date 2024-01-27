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

  /**
   * Initialize the component and perform user authentication based on session data.
   *
   * @return {void} 
   */
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

  /**
   * Handle the submission of the form.
   *
   * @param None
   * @return void
   */
  onSubmit(): void {
    this.loginService
      .checkUserCredentials(this.email, this.password)
      .subscribe((isLogged) => {
        isLogged ? this.successfulLogin() : this.failedLogin();
      });
  }

  /**
   * This function handles a successful login by hiding the login page,
   * displaying the minimized login, and updating the user email.
   * 
   * @return void
   */
  successfulLogin(): void {
    this.isLoginPageHidden = true;
    this.minimizedLoginService.isLoginMinimizedDisplayed.next(true);
    this.minimizedLoginService.userEmail.next(this.email);
  }

  /**
   * failedLogin function.
   * 
   * @returns void
   */
  failedLogin(): void {
    this.informationBoxService.open('Wrong email or password');
    this.email = '';
    this.password = '';
  }
}
