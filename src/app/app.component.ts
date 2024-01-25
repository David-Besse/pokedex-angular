// Root component

import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterOutlet,
  RouterLinkActive,
} from '@angular/router';
import LoginComponent from './auth/login/login.component';
import { NgIf } from '@angular/common';
import { MinimizedLoginComponent } from './auth/login/minimized-login/minimized-login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LoginComponent,
    NgIf,
    MinimizedLoginComponent,
  ],
})
export class AppComponent implements OnInit {
  isLoginBoxMinimized: boolean = false;

  constructor(private router: Router) {}

  /**
   * Initialize the component when it is first loaded.
   * Listen to the login event to minimize the login box.
   */
  ngOnInit() {
    this.router.events.subscribe(() => this.onLogin());
  }

  /**
   * Function to handle the login event.
   * Minimize the login box if the current route is not /login, otherwise maximize it.
   */
  onLogin() {
    this.router.url.includes('login')
      ? (this.isLoginBoxMinimized = true)
      : (this.isLoginBoxMinimized = false);
  }
}
