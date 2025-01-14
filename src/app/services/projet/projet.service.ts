import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {Projet, SaveProjet, UpdateProjet} from "../../models/Projet";

@Injectable({
  providedIn: 'root'
})
export class ProjetService {


    private  url  = environment.api_ulr+`projet`;
  constructor(
      private http: HttpClient,
      private fb: FormBuilder
  ) { }

    createProjetFrom() {
      return this.fb.group({
          projet_type: [''],
          description: ['', Validators.required],
          offre: [true],
          client_id: ['']
      });
    }

    createProjetUpdateFrom() {
        return this.fb.group({
            projet_type: [''],
            description: ['', Validators.required],
            offre: [true]
        });
    }

    saveProjet(data: SaveProjet) {
      return this.http.post<Projet>(this.url, data);
    }

    getAllProjet() {
        return this.http.get<Projet[]>(this.url);
    }

    updateProjet(data: UpdateProjet, id: string) {
        return this.http.put<Projet>(this.url+`/${id}`, data);
    }

    deleteProjet(id: string) {
        return this.http.delete<Projet>(this.url+`/${id}`);
    }

    changeOffre(id: string) {
        return this.http.get<boolean>(this.url+`/${id}`);
    }





}
