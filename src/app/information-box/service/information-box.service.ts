// setText(text: string): Sets the text value using the BehaviorSubject.
// getText(): Retrieves the text value as an observable.

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InformationBoxService {
  textSubject = new BehaviorSubject<string>('');
  isDisplayed: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.isDisplayed.next(false);
  }

  /**
   * Sets the text of the component.
   *
   * @param {string} text - the text to set
   * @return {void}
   */
  setText(text: string): void {
    this.textSubject.next(text);
  }

  /**
   * Gets the text as an observable.
   *
   * @return {Observable} the text as an observable
   */
  getText(): Observable<string> {
    return this.textSubject.asObservable();
  }

  close() {
    this.setText('');
    this.isDisplayed.next(false);
  }

  open(text: string) {
    this.setText(text);
    this.isDisplayed.next(true);
  }
}
