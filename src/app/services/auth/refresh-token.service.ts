import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {StockService} from '../stock/stock.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {

  private url = environment.api_ulr+`auth/refresh-token`;
  constructor(
    private http: HttpClient,
    private stoke:StockService
  ) { }

  refreshtoken(){
    return this.http.post<{bearer:string,refresh:string}>(this.url, {refresh:this.stoke.gettolocalstore_refresh()})
  }

}
