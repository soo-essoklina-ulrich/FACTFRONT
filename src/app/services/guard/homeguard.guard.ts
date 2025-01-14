import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {JwtdecodeService} from "../decode/jwtdecode.service";


export const homeguardGuard: CanActivateFn = (route, state) => {
    return !inject(JwtdecodeService).isTokenExpired();
};
