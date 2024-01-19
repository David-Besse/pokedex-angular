import { Injectable } from '@angular/core';
import { Observable, delay, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged: boolean = false;

  constructor() {}

  login(email: string, password: string): Observable<boolean> {
    const isConnected: boolean =
      email === 'admin@pkm.com' && password === 'AdminPKM2024!';

    if (isConnected) {
      this.isLogged = isConnected;
    }

    return of(isConnected).pipe(delay(1000));
  }

  logout(): void {
    this.isLogged = false;
  }
}
