import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Crud} from "../_interface/Crud";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FactureService implements Crud {
    private url = environment.api_ulr + `facture`;

    constructor(
        private http: HttpClient,
    ) {
    }

    PostData(data: any): Observable<any> {
        return this.http.post<any>(`${this.url}/${data}`, {});
    }
    getAll(): Observable<any> {
        throw new Error('Method not implemented.');
    }
    Updatedata(id: string, data: any): Observable<any> {
        throw new Error('Method not implemented.');
    }
    DeleteDAta(id: string): Observable<any> {
        throw new Error('Method not implemented.');
    }
}
