// setText(text: string): Sets the text value using the BehaviorSubject.
// getText(): Retrieves the text value as an observable.

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InformationBoxService {
  private textSubject = new BehaviorSubject<string>('');

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
}
