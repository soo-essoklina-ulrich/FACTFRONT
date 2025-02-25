import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { JwtdecodeService } from '../decode/jwtdecode.service';
import { RefreshTokenService } from '../auth/refresh-token.service';
import { StockService } from '../stock/stock.service';
import { LogoutService } from '../auth/logout.service';

export const homeguardGuard: CanActivateFn = (route, state) => {
    const refreshTokenservice = inject(RefreshTokenService);
    const tokenExpired = inject(JwtdecodeService);
    const stockService = inject(StockService);
    const logout = inject(LogoutService);
    if (!tokenExpired.isTokenExpired()) {
        return true;
    } else {
        let verifier: boolean = false;
        refreshTokenservice.refreshtoken().subscribe(
            (res) => {
                stockService.settolocalstore_token(res.bearer);
                stockService.settolocalstore_refresh(res.refresh);
                verifier = true;
                console.log('token refreshed');
            },
            (error) => {
                console.log(error);
                logout.gotologinpage();
            }
        );
        return verifier;
    }
};
