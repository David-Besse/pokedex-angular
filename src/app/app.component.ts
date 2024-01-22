import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import LoginComponent from './auth/login/login.component';
import { AuthService } from './auth/service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, RouterLink, NgIf, LoginComponent],
})
export class AppComponent {
  isConnected: boolean;

  constructor(private authService: AuthService) {
    this.isLoginMinimized();
  }

  isLoginMinimized() {
    this.authService.isLogged?.subscribe((isLogged) => {
      isLogged ? (this.isConnected = true) : (this.isConnected = false);
    });
  }
}
