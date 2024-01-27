import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MinimizedLoginService {
  isLoginMinimizedDisplayed: Subject<boolean> = new Subject<boolean>();
  userEmail: Subject<string> = new Subject<string>();

  constructor() {
    this.isLoginMinimizedDisplayed.next(false);
    this.userEmail.next('anonymous');
  }
}
