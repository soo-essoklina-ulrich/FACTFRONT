import { Injectable } from '@angular/core';
import {StockService} from '../stock/stock.service';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtdecodeService {

  constructor(
    private stockeservice:StockService
  ) { }

  public getexpirationdate():Date | null{
    const decoded = jwtDecode(this.stockeservice.gettolocalstore_token());
    if(decoded.exp===undefined) return null;
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }


  public isTokenExpired():boolean{
    const date = this.getexpirationdate();
    if(date===undefined) return false;
    return !(date!.valueOf() > Date.now().valueOf());
  }
}
