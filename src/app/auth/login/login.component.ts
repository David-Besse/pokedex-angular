// This class is a component for the login page.
// ngOnInit(): Initializes the component with the user's session status.
// onSubmit(): Submits the form and logs in the user.
// handleSuccessfulLogin(): Handles successful login by navigating to the pokemons page, minimizing the login box, and setting the login session.
// handleFailedLogin(): Handles a failed login attempt by displaying an error message and resetting the email and password fields.
// handleLogout(): Handles the logout process by clearing the login session, logging out the user, and resetting the email and password fields.

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { InformationBoxService } from '../../information-box/service/information-box.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { InformationBoxComponent } from '../../information-box/information-box.component';
import { BrowserSessionStorageService } from '../../browser-storage.service';

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
  @ViewChild(InformationBoxComponent)
  informationBoxComponent!: InformationBoxComponent;
  minimizedLoginBox: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private informationBoxService: InformationBoxService,
    private sessionStorageService: BrowserSessionStorageService
  ) {}

  /**
   * Initialize the component with the user's session status.
   *
   * @return {void}
   */
  ngOnInit(): void {
    const isUserConnected = this.sessionStorageService.get('login');

    if (isUserConnected === 'true') {
      this.authService.isLogged = true;
      this.minimizedLoginBox = true;
      this.router.navigate(['/pokemons']);
    }
  }

  /**
   * Submit the form and log in the user.
   *
   * No parameters
   * No return value
   */
  onSubmit() {
    this.authService.login(this.email, this.password).subscribe((isLogged) => {
      isLogged ? this.handleSuccessfulLogin() : this.handleFailedLogin();
    });
  }

  /**
   * Handle successful login by navigating to the pokemons page,
   * minimizing the login box, and setting the login session in
   * sessionStorage.
   */
  handleSuccessfulLogin() {
    this.router.navigate(['/pokemons']);
    this.minimizedLoginBox = true;
    this.sessionStorageService.set('login', 'true');
  }

  /**
   * Handle a failed login attempt.
   */
  handleFailedLogin() {
    this.informationBoxService.setText('Wrong email or password');
    this.informationBoxComponent.open();
    this.email = '';
    this.password = '';
  }

  /**
   * Handle the logout process.
   *
   */
  handleLogout() {
    this.sessionStorageService.set('login', 'false');
    this.authService.logout();
    this.email = '';
    this.password = '';
    this.minimizedLoginBox = false;
    this.router.navigate(['/login']);
  }
}
