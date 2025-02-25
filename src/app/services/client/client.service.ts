import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Client, ClientSave } from '../../models/Client';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private api = environment.api_ulr + 'client';

    constructor(
        private http: HttpClient,
        private fb: FormBuilder
    ) {}

    crateForm() {
        return this.fb.group({
            lieu: ['', Validators.required],
            nom: ['', Validators.required],
            sigle: ['', Validators.required],
            telephone: ['', Validators.required],
            potentiel: [false]
        });
    }

    getClients() {
        return this.http.get<Client[]>(this.api);
    }

    saveClient(client: ClientSave) {
        return this.http.post<Client>(this.api, client);
    }

    updateClient(id: string, client: ClientSave) {
        return this.http.put<Client>(this.api + '/' + id, client);
    }

    deleteClient(id: string) {
        return this.http.delete<void>(this.api + '/' + id);
    }

    changePotentiel(id: string) {
        return this.http.get<Boolean>(this.api + '/' + id);
    }
}
