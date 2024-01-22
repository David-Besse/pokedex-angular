import { Injectable } from '@angular/core';
import {
  BrowserLocalStorageService,
  BrowserSessionStorageService,
} from './browser-storage.service';

@Injectable()
export class BrowserLocalStorageServerService extends BrowserLocalStorageService {
  constructor() {
    super({
      clear: () => {},
      getItem: (key: string) => JSON.stringify({ key }),
      setItem: (key: string, value: string) => JSON.stringify({ [key]: value }),
      key: (index: number) => index.toString(),
      length: 0,
      removeItem: (key: string) => JSON.stringify({ key }),
    });
  }
}

@Injectable()
export class BrowserSessionStorageServerService extends BrowserSessionStorageService {
  constructor() {
    super({
      clear: () => {},
      getItem: (key: string) => JSON.stringify({ key }),
      setItem: (key: string, value: string) => JSON.stringify({ [key]: value }),
      key: (index: number) => index.toString(),
      length: 0,
      removeItem: (key: string) => JSON.stringify({ key }),
    });
  }
}
