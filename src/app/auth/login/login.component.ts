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
    this.auth.login(this.email, this.password).subscribe((isLogged) => {
      if (isLogged) {
        this.handleSuccessfulLogin();
      } else {
        this.handleFailedLogin();
      }
    });
  }

  handleSuccessfulLogin() {
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
    this.auth.isLogged = false;
    this.router.navigate(['/login']);
  }

  displayInformationBox(message: string) {
    this.informationBoxService.setText(message);
    this.informationBoxService.toggleInformationBox = true;
  }
}
