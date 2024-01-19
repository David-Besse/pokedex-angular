import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged: boolean = false;

  constructor(private http: HttpClient) {}

  login(givenEmail: string, givenPassword: string): Observable<boolean> {
    const currentUser: Observable<User[] | null> = this.http
      .get<User[]>(`users?email=${givenEmail}`)
      .pipe(
        map((users: User[]) => {
          if (users.length > 0) {
            const foundUser: User = users[0];
            if (foundUser.password === givenPassword) {
              return [foundUser];
            }
          }
          return null;
        })
      );

    if (currentUser) {
      this.isLogged = true;
    }

    return of(true).pipe(delay(1000));
  }

  logout(): void {
    this.isLogged = false;
  }
}
