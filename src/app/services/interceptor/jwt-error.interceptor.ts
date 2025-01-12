import {HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {RefreshTokenService} from '../auth/refresh-token.service';
import {inject} from '@angular/core';
import {StockService} from '../stock/stock.service';
import {LogoutService} from '../auth/logout.service';

export const jwtErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const refreshTokenservice = inject(RefreshTokenService)
  const stockService = inject(StockService);
  const logout = inject(LogoutService);
  return next(req).pipe(
    catchError(err => {
      if (err.status === 403) {
        refreshTokenservice.refreshtoken().subscribe(
          res => {
            stockService.settolocalstore_token(res.bearer);
            stockService.settolocalstore_refresh(res.refresh);
          },
          error => {
            logout.gotologinpage();
          }
        );
      }


      return throwError(err);
    })
  );
};
