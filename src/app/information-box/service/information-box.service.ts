import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InformationBoxService {
  private textSubject = new BehaviorSubject<string>('');
  toggleInformationBox: boolean;

  setText(text: string) {
    this.textSubject.next(text);
  }

  getText() {
    return this.textSubject.asObservable();
  }
}
