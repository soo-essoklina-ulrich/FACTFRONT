import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastMessageOptions } from 'primeng/api';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    private url = environment.api_ulr + 'report';
    private toastMeesageSubject = new Subject<ToastMessageOptions>();

    toastMessage = this.toastMeesageSubject.asObservable();

    constructor(
        private http: HttpClient
    ) {
    }

    genereateReport(numero: string) {
        this.http.get(`${this.url}/${numero}`, { responseType: 'arraybuffer' }).subscribe(
            (data) => {
                const blob = new Blob([data], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(blob);
                window.open(url);
            }, error => {
                console.log(error);
                this.toastMeesageSubject.next({
                    severity: 'warn',
                    summary: 'Génération du rapport',
                    detail: 'Erreur de génération du rapport'
                });

            }
        );
    }
}
