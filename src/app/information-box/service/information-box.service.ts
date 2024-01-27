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

  /**
   * Closes the function by setting the text to an empty string and signaling that it is not displayed.
   */
  close() {
    this.setText('');
    this.isDisplayed.next(false);
  }

  /**
   * Opens the text.
   *
   * @param {string} text - the text to be opened
   * @return void 
   */
  open(text: string): void {
    this.setText(text);
    this.isDisplayed.next(true);
  }
}
