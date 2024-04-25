// This class definition is for the AuthService.

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BrowserSessionStorageService } from '../../browser-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uri: string = environment.serverUrl + '/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  isLogged: boolean;

  constructor(
    private http: HttpClient,
    private sessionStorageService: BrowserSessionStorageService
  ) {}

  /**
   * Logs in the user with the given email and password.
   *
   * @param {string} givenEmail - the email provided for login
   * @param {string} givenPassword - the password provided for login
   * @return {Observable<boolean>} an observable that emits a boolean value indicating if the login was successful
   */
  login(givenEmail: string, givenPassword: string): Observable<boolean> {
    return this.http
      .post<{ email: string; accessToken: string }>(
        this.uri + '/login',
        { email: givenEmail, password: givenPassword },
        this.httpOptions
      )
      .pipe(
        map((user) => {
          if (user) {
            this.sessionStorageService.set('pokedex_token', user.accessToken);
            return true;
          } else {
            return false;
          }
        }),
        tap((isLogged) => (this.isLogged = isLogged))
      );
  }

  /**
   * Logout the user by setting isLogged to false.
   *
   * @return {Observable<boolean>} an observable that emits a boolean value indicating if the logout was successful
   */
  logout(): Observable<boolean> {
    return this.http.post<boolean>(this.uri + '/logout', {}).pipe(
      map((res) => res),
      tap(() => {
        this.isLogged = false;
      })
    );
  }
}
