import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { LogoutService } from '../auth/logout.service';

export const jwtErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const logout = inject(LogoutService);
    return next(req).pipe(
        catchError((err) => {
            if (err.status === 403) {
                logout.gotologinpage();
            }
            return throwError(err);
        })
    );
};
