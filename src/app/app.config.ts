import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  //withComponentInputBinding -- to link parameters with input
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
  ],
};
