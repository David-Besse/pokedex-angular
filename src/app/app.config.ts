import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppRoutes } from './app.routes';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  BrowserLocalStorageService,
  BrowserSessionStorageService,
} from './browser-storage.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    importProvidersFrom(BrowserModule, FormsModule, BrowserLocalStorageService,
      BrowserSessionStorageService,),
    provideRouter(AppRoutes),
    provideClientHydration(),
    BrowserLocalStorageService,
    BrowserSessionStorageService,
  ],
};
