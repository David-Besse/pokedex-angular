import { Inject, Injectable, InjectionToken } from '@angular/core';

export const BROWSER_LOCALSTORAGE = new InjectionToken<Storage>(
  'Browser localStorage',
  {
    providedIn: 'root',
    factory: () => localStorage,
  }
);

export const BROWSER_SESSIONSTORAGE = new InjectionToken<Storage>(
  'Browser sessionStorage',
  {
    providedIn: 'root',
    factory: () => sessionStorage,
  }
);

@Injectable()
export class BrowserLocalStorageService {
  item: string | null;

  constructor(@Inject(BROWSER_LOCALSTORAGE) public localStorage: Storage) {}

  get(key: string) {
    return this.localStorage.getItem(key);
  }

  set(key: string, value: string) {
    this.localStorage.setItem(key, value);
  }

  remove(key: string) {
    this.localStorage.removeItem(key);
  }

  clear() {
    this.localStorage.clear();
  }
}

@Injectable()
export class BrowserSessionStorageService {
  item: string | null;

  constructor(@Inject(BROWSER_SESSIONSTORAGE) public sessionStorage: Storage) {}

  get(key: string) {
    return this.sessionStorage.getItem(key);
  }

  set(key: string, value: string) {
    this.sessionStorage.setItem(key, value);
  }

  remove(key: string) {
    this.sessionStorage.removeItem(key);
  }

  clear() {
    this.sessionStorage.clear();
  }
}
