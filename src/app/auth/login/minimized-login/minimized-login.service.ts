import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MinimizedLoginService {
  isLoginMinimizedDisplayed: Subject<boolean> = new Subject<boolean>();
  userEmail: Subject<string> = new Subject<string>();

  /**
   * Constructor for initializing default values.
   */
  constructor() {
    this.isLoginMinimizedDisplayed.next(false);
    this.userEmail.next('anonymous');
  }
}
