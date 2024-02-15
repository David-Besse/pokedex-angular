// This class definition is for the AuthService.

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uri: string = 'http://localhost:8080/api/login';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
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
    const checkUser: Observable<boolean> = this.http
      .post<User>(
        this.uri,
        {
          email: givenEmail,
          password: givenPassword,
        },
        this.httpOptions
      )
      .pipe(
        map((user) => {
          if (!user) {
            return false;
          }
          return true;
        }),
        catchError((error) => {
          console.error('User not found', error);
          return of(false);
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
