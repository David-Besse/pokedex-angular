import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { InformationBoxService } from '../../information-box/service/information-box.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { InformationBoxComponent } from '../../information-box/information-box.component';
import { BrowserSessionStorageService } from '../../browser-storage.service';
import { LoginService } from './login.service';

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
  @ViewChild(InformationBoxComponent)
  informationBoxComponent!: InformationBoxComponent;

  constructor(
    private authService: AuthService,
    private router: Router,
    private informationBoxService: InformationBoxService,
    private sessionStorageService: BrowserSessionStorageService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const isUserConnected = this.sessionStorageService.get('login');

    if (isUserConnected === 'true') {
      this.authService.isLogged = true;
      this.isLoginPageHidden = true;
      this.router.navigate(['/pokemons']);
    }
  }

  onSubmit() {
    this.loginService
      .checkUserCredentials(this.email, this.password)
      .subscribe((isLogged) => {
        isLogged ? this.showSuccessfulLogin() : this.showFailedLogin();
      });
  }

  showSuccessfulLogin() {
    this.informationBoxService.setText('You are connected !');
    this.informationBoxComponent.open();
    this.isLoginPageHidden = this.loginService.isLoginMinimizedDisplayed;
  }

  showFailedLogin() {
    this.informationBoxService.setText('Wrong email or password');
    this.informationBoxComponent.open();
    this.email = '';
    this.password = '';
  }
}
