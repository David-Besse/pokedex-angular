// This class is a component for a minimized login feature in an Angular application. Here's a list of what each method does:
// ngOnInit(): Initializes the component and subscribes to the minimizedLoginService to update the display of the login and the user email.
// disconnect(): Disconnects the user by updating the state of minimized login display and user email to 'anonymous' and handles the logout.

import { Component, OnInit } from '@angular/core';
import LoginComponent from '../login.component';
import { NgIf } from '@angular/common';
import { LoginService } from '../login.service';
import { MinimizedLoginService } from './minimized-login.service';

@Component({
  selector: 'app-minimized-login',
  standalone: true,
  imports: [NgIf, LoginComponent],
  templateUrl: './minimized-login.component.html',
  styleUrl: './minimized-login.component.scss',
})
export class MinimizedLoginComponent implements OnInit {
  isLoginMinimizedDisplayed: boolean;
  userEmail: string;

  constructor(
    private loginService: LoginService,
    private minimizedLoginService: MinimizedLoginService
  ) {}

  /**
   * Initializes the component and subscribes to the minimizedLoginService
   * to update the display of the login and the user email.
   *
   */
  ngOnInit(): void {
    this.minimizedLoginService.isLoginMinimizedDisplayed.subscribe(
      (isDisplayed) => {
        this.isLoginMinimizedDisplayed = isDisplayed;
      }
    );
    this.minimizedLoginService.userEmail.subscribe((userEmail) => {
      this.userEmail = userEmail;
    });
  }

  /**
   * Disconnects the user by updating the state of minimized login display and user email
   * to 'anonymous' and handles the logout.
   */
  disconnect() {
    this.minimizedLoginService.isLoginMinimizedDisplayed.next(false);
    this.minimizedLoginService.userEmail.next('anonymous');
    this.loginService.handleLogout();
  }
}
