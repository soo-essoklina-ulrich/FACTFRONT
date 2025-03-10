import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { inject } from '@angular/core';
import { StockService } from '../stock/stock.service';
import { JwtdecodeService } from '../decode/jwtdecode.service';
import { RefreshTokenService } from '../auth/refresh-token.service';
import { LogoutService } from '../auth/logout.service';

const excludedUrls = [environment.api_ulr + 'auth/login', environment.api_ulr + 'auth/refresh-token'];

export const setjwtInterceptor: HttpInterceptorFn = (req, next) => {
    const stockService = inject(StockService);
    const decode = inject(JwtdecodeService);
    const refreshTokenservice = inject(RefreshTokenService);
    const logout = inject(LogoutService);

    if (!excludedUrls.includes(req.url)) {
        if (!decode.isTokenExpired()) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${stockService.gettolocalstore_token()}`
                }
            });
        } else {
            refreshTokenservice.refreshtoken().subscribe(
                (res) => {
                    stockService.settolocalstore_token(res.bearer);
                    stockService.settolocalstore_refresh(res.refresh);
                    req = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${res.bearer}`
                        }
                    });
                },
                (error) => {
                    console.log(error);
                    logout.gotologinpage();
                }
            );
            console.log('finish  here');
        }
        return next(req);
    } else {
        return next(req);
    }
};
