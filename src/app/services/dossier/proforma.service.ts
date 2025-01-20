import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Crud} from "../_interface/Crud";
import { Observable } from 'rxjs';
import {Proforma, ProformaSave} from "../../models/dossier/Proforma";
import {FormBuilder, Validators} from "@angular/forms";
import {Article_QuantiteSave} from "../../models/dossier/Article_Quantite";

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
    PostData(adta: ProformaSave): Observable<Proforma> {
      return  this.http.post<Proforma>(this.url, adta);
    }
    getAll(): Observable<Proforma[]> {
        return this.http.get<Proforma[]>(this.url);
    }

    getAllNumeroList(): Observable<string[]> {
        return this.http.get<string[]>(this.url + '/numero');
    }

    getbyNumero(numero: string): Observable<Proforma> {
        return this.http.get<Proforma>(this.url + `/${numero}`);
    }

    updatereference(refrence: string): Observable<string> {
        return this.http.put<string>(this.url + `/${refrence}`, null);
    }

    Updatedata(id: string, article_quantite:Article_QuantiteSave[]): Observable<Proforma> {
        return this.http.put<Proforma>(this.url + `/${id}`, article_quantite);
    }
    DeleteDAta(numero: string): Observable<any> {
        return this.http.delete<any>(this.url + `/${numero}`);
    }


}
