import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { MydynamicdialogComponent } from '../../layout/component/mydynamicdialog/mydynamicdialog.component';
import { StockService } from '../stock/stock.service';

@Injectable({
    providedIn: 'root'
})
export class LogoutService {
    constructor(
        private dialogService: DialogService,
        private stocke: StockService,
        private http: HttpClient,
        private router: Router
    ) {}

    logout() {
        this.http.post(environment.api_ulr + 'auth/logout', {}).subscribe(
            (res) => {
                this.stocke.clear();
            },
            (err) => {
                console.log(err);
            }
        );
        this.router.navigate(['/auth']).then((r) => console.log(r));
    }

    gotologinpage() {
        const ref = this.dialogService.open(MydynamicdialogComponent, {
            header: 'Veiller vous connecter',
            width: '22rem',
            modal: true,
            contentStyle: { 'max-height': '500px', overflow: 'auto' },
            baseZIndex: 10000,
            data: { message: 'Vous avez été déconnecté, veuillez vous reconnecter' }
        });
    }
}
