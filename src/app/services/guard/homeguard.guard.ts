import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {JwtdecodeService} from "../decode/jwtdecode.service";


export const homeguardGuard: CanActivateFn = (route, state) => {
    console.log('homeguardGuard', inject(JwtdecodeService).isTokenExpired())
    return  inject(JwtdecodeService).isTokenExpired();
};
