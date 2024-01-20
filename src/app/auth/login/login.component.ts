import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  @Input() email: string = '';
  @Input() password: string = '';
 @ViewChild(InformationBoxComponent) informationBoxComponent!: InformationBoxComponent;
  auth: AuthService;
  minimizedLoginBox: boolean;

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
      isLogged ? this.handleSuccessfulLogin() : this.handleFailedLogin();
    });
  }

  handleSuccessfulLogin() {
    this.minimizedLoginBox = true;
    this.router.navigate(['/pokemons']);
  }

  handleFailedLogin() {
    this.informationBoxService.setText('Wrong email or password');
    this.informationBoxComponent.open();
    this.email = '';
    this.password = '';
  }

  handleLogout() {
    this.email = '';
    this.password = '';
    this.auth.isLogged = false;
    this.router.navigate(['/login']);
  }
}
