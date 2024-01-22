import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import {
  BrowserLocalStorageService,
  BrowserSessionStorageService,
} from './browser-storage.service';
import {
  BrowserLocalStorageServerService,
  BrowserSessionStorageServerService,
} from './browser-storage-server.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: BrowserLocalStorageService,
      useClass: BrowserLocalStorageServerService,
    },
    {
      provide: BrowserSessionStorageService,
      useClass: BrowserSessionStorageServerService,
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
