import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { InformationBoxService } from '../../information-box/service/information-box.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { InformationBoxComponent } from '../../information-box/information-box.component';
import { BrowserSessionStorageService } from '../../browser-storage.service';
import { of } from 'rxjs';
// import { Observable } from 'rxjs';

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
  currentUser: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private informationBoxService: InformationBoxService,
    private sessionStorageService: BrowserSessionStorageService
  ) {}

  ngOnInit(): void {
    const isUserConnected = this.sessionStorageService.get('login');

    if (isUserConnected === 'true') {
      this.authService.isLogged = of(true);
      this.minimizedLoginBox = true;
      this.router.navigate(['/pokemons']);
    }
  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe((isLogged) => {
      isLogged ? this.handleSuccessfulLogin() : this.handleFailedLogin();
    });
  }

  handleSuccessfulLogin() {
    this.currentUser = this.email;
    this.router.navigate(['/pokemons']);
    this.minimizedLoginBox = true;
    this.sessionStorageService.set('login', 'true');
  }

  handleFailedLogin() {
    this.informationBoxService.setText('Wrong email or password');
    this.informationBoxComponent.open();
    this.email = '';
    this.password = '';
  }

  handleLogout() {
    this.sessionStorageService.set('login', 'false');
    this.email = '';
    this.password = '';
    this.authService.isLogged = of(false);
    this.minimizedLoginBox = false;
    this.router.navigate(['/login']);
  }
}
