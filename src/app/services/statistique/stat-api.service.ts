import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Statistique } from '../../models/statistique/Statistique';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatAPIService {

    private url = environment.api_ulr+ `stat`;

  constructor(
      private http:HttpClient
  ) { }

    getstat(){
      return this.http.get<Statistique>(this.url);
    }
}
