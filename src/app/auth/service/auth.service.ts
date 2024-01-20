import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged: boolean;
  currentUser: Observable<User[] | null>;

  constructor(private http: HttpClient) {}

  login(givenEmail: string, givenPassword: string): Observable<boolean> {
    return this.http
      .get<User[]>(`http://localhost:3000/users?email=${givenEmail}`)
      .pipe(
        map((users: User[]) => {

          const foundUser: User | undefined = users.find(
            (user) => user.password === givenPassword
          );

          this.isLogged = foundUser ? true : false;
          return this.isLogged;
        })
      );
  }

  logout(): void {
    this.isLogged = false;
  }
}
