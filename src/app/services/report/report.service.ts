import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    private url = environment.api_ulr + 'report'

    constructor(
        private http: HttpClient
    ) {
    }

    genereateReport(numero: string):Observable<ArrayBuffer> {
        return this.http.get(`${this.url}/${numero}`, {responseType: 'arraybuffer'});
    }
}
