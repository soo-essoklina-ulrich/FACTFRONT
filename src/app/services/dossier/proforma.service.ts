import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Crud} from "../_interface/Crud";
import { Observable } from 'rxjs';
import {Proforma} from "../../models/dossier/Proforma";
import {FormBuilder, Validators} from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class ProformaService implements Crud {
    private url = environment.api_ulr + `proforma`;

    constructor(
        private http: HttpClient,
        private fb:FormBuilder
    ) {
    }

    public createFormProforma(){
        return this.fb.group({
            projet_id: [''],
            client_id:[''],
            reference: ['', Validators.required],
            articleQuantiteslist: this.fb.array([this.createFormArticle_Quantite()]),
        });
    }
    public createFormArticle_Quantite() {
        return this.fb.group({
            article_id: ['', Validators.required],
            quantite: ['', Validators.required],
            prix_article: [0, Validators.required],
        });
    }
    PostData(adta: any): Observable<Proforma> {
      return  this.http.post<Proforma>(this.url, adta);
    }
    getAll(): Observable<Proforma[]> {
        return this.http.get<Proforma[]>(this.url);
    }
    Updatedata(id: string, data: any): Observable<Proforma> {
        return this.http.put<Proforma>(this.url + `/${id}`, data);
    }
    DeleteDAta(id: string): Observable<any> {
        throw new Error('Method not implemented.');
    }


}
