// This class definition is for the AuthService.

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged: boolean;

  constructor(private http: HttpClient) {}

  /**
   * Logs in the user with the given email and password.
   *
   * @param {string} givenEmail - the email provided for login
   * @param {string} givenPassword - the password provided for login
   * @return {Observable<boolean>} an observable that emits a boolean value indicating if the login was successful
   */
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
        isLogged ? (this.isLogged = true) : (this.isLogged = false);
      })
    );
  }

  /**
   * Logout the user by setting isLogged to false.
   *
   * @return {void}
   */
  logout(): void {
    this.isLogged = false;
  }
}
