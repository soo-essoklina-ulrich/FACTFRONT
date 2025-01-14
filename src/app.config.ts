import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import {setjwtInterceptor} from "./app/services/interceptor/setjwt.interceptor";
import {jwtErrorInterceptor} from "./app/services/interceptor/jwt-error.interceptor";
import {DialogService} from "primeng/dynamicdialog";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withFetch(), withInterceptors([
            setjwtInterceptor,
            jwtErrorInterceptor
        ])),
        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
        DialogService
    ]
};
