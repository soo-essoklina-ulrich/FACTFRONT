import {HttpInterceptorFn} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {inject} from '@angular/core';
import {StockService} from '../stock/stock.service';
import {JwtdecodeService} from '../decode/jwtdecode.service';
import {RefreshTokenService} from '../auth/refresh-token.service';

const excludedUrls = [
  environment.api_ulr + 'auth/login',
  environment.api_ulr + 'auth/refresh-token',
]

export const setjwtInterceptor: HttpInterceptorFn = (req, next) => {
  const stockService = inject(StockService);
  const decode = inject(JwtdecodeService)
  const refreshTokenservice = inject(RefreshTokenService)

  if (!excludedUrls.includes(req.url)) {
    if (decode.isTokenExpired()) {
      req.headers.set('Authorization', `Bearer ${stockService.gettolocalstore_token()}`);
    } else {
      refreshTokenservice.refreshtoken().subscribe(
        res => {
          stockService.settolocalstore_token(res.bearer)
          stockService.settolocalstore_refresh(res.refresh)
        },
        error => {
          console.log(error)
        }
      );
      req.headers.set('Authorization', `Bearer ${stockService.gettolocalstore_token()}`)

    }
    return next(req)
  }
  return next(req);
};
