import { Component } from '@angular/core';
import LoginComponent from '../login.component';
import { NgIf } from '@angular/common';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-minimized-login',
  standalone: true,
  imports: [NgIf, LoginComponent],
  templateUrl: './minimized-login.component.html',
  styleUrl: './minimized-login.component.scss',
})
export class MinimizedLoginComponent {
  isLoginMinimizedDisplayed: boolean = false;
  user: string;

  constructor(
    private loginService: LoginService,
  ) {
    this.isLoginMinimizedDisplayed =
      this.loginService.isLoginMinimizedDisplayed;
    this.user = this.loginService.currentUserEmail;
  }

  disconnect() {
    this.loginService.handleLogout();
  }
}
