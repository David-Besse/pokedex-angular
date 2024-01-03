import { bootstrapApplication } from '@angular/platform-browser';
// The bootstrapApplication function is responsible for starting the Angular application.

import { appConfig } from './app/app.config';
// The appConfig object contains configuration settings for the application.

import { AppComponent } from './app/app.component';
// The AppComponent class is the root component of the application. It is the component that is rendered when the application starts.

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
