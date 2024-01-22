import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged: Observable<boolean>;

  constructor(private http: HttpClient) {}

  login(givenEmail: string, givenPassword: string): Observable<boolean> {
    const checkUser = this.http
      .get<User[]>(`http://localhost:3000/users?email=${givenEmail}`)
      .pipe(
        map((users) => {
          return users.some((user) => user.password === givenPassword);
        })
      );

    return checkUser.pipe(
      tap((isLogged) => {
        isLogged ? (this.isLogged = of(true)) : (this.isLogged = of(false));
      })
    );
  }

  logout(): void {
    this.isLogged = of(false);
  }
}
