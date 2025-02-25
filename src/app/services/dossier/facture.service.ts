import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Crud } from '../_interface/Crud';
import { Observable } from 'rxjs';
import { Facture } from '../../models/dossier/Facture';

@Injectable({
    providedIn: 'root'
})
export class FactureService implements Crud {
    private url = environment.api_ulr + `facture`;

    constructor(private http: HttpClient) {}

    PostData(id_borderau: any): Observable<Facture> {
        return this.http.post<Facture>(`${this.url}/${id_borderau}`, {});
    }
    getAll(): Observable<Facture[]> {
        return this.http.get<Facture[]>(this.url);
    }
    Updatedata(id: string, data: any): Observable<any> {
        throw new Error('Method not implemented.');
    }
    DeleteDAta(id: string): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`);
    }
}
