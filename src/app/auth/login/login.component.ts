import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { InformationBoxService } from '../../information-box/service/information-box.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { InformationBoxComponent } from '../../information-box/information-box.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, InformationBoxComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  toggleConnectionButton: boolean = false;
  auth: AuthService;

  constructor(
    private authService: AuthService,
    private router: Router,
    private informationBoxService: InformationBoxService
  ) {}

  ngOnInit() {
    this.auth = this.authService;
  }

  onSubmit() {
    if (!this.toggleConnectionButton) {
      this.auth.login(this.email, this.password).subscribe((isLogged) => {
        if (isLogged) {
          this.handleSuccessfulLogin();
        } else {
          this.handleFailedLogin();
        }
      });
    } else {
      this.auth.logout();
      this.handleLogout();
    }
  }

  handleSuccessfulLogin() {
    this.toggleConnectionButton = false;
    this.router.navigate(['/pokemons']);
  }

  handleFailedLogin() {
    this.displayInformationBox('Wrong credentials');
    this.email = '';
    this.password = '';
  }

  handleLogout() {
    this.email = '';
    this.password = '';
    this.router.navigate(['/login']);
  }

  displayInformationBox(message: string) {
    this.informationBoxService.setText(message);
    this.informationBoxService.toggleInformationBox = true;
  }
}
