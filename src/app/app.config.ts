import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {setjwtInterceptor} from './services/interceptor/setjwt.interceptor';
import {DialogService} from 'primeng/dynamicdialog';
import {jwtErrorInterceptor} from './services/interceptor/jwt-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([setjwtInterceptor,jwtErrorInterceptor])
    ),
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  DialogService],

};
