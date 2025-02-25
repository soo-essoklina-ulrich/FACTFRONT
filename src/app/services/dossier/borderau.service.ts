import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Crud } from '../_interface/Crud';
import { Observable } from 'rxjs';
import { Borderau } from '../../models/dossier/Borderau';

@Injectable({
    providedIn: 'root'
})
export class BorderauService implements Crud {
    private url = environment.api_ulr + `borderau`;

    constructor(private http: HttpClient) {}

    PostData(id_proforma: string): Observable<Borderau> {
        return this.http.post<Borderau>(`${this.url}/${id_proforma}`, {});
    }
    getAll(): Observable<Borderau[]> {
        return this.http.get<Borderau[]>(`${this.url}`);
    }
    getAllWhoNoUseTocreateFacture(): Observable<Borderau[]> {
        return this.http.get<Borderau[]>(`${this.url}/not-use`);
    }
    Updatedata(id: string, data: any): Observable<any> {
        throw new Error('Method not implemented.');
    }
    DeleteDAta(id: string): Observable<any> {
        return this.http.delete(`${this.url}/${id}`);
    }
}
