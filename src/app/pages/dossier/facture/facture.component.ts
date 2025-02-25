import { Component, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { LoaderComponent } from '../../../layout/component/loader/loader.component';
import { TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { Tooltip } from 'primeng/tooltip';
import { Facture } from '../../../models/dossier/Facture';
import { FactureService } from '../../../services/dossier/facture.service';
import { BorderauService } from '../../../services/dossier/borderau.service';
import { MessageService } from 'primeng/api';
import { Borderau } from '../../../models/dossier/Borderau';
import { ReportService } from '../../../services/report/report.service';

@Component({
    selector: 'app-facture',
    imports: [Button, DatePipe, InputText, LoaderComponent, TableModule, Toast, Tooltip],
    templateUrl: './facture.component.html',
    styleUrl: './facture.component.scss',
    providers: [MessageService]
})
export class FactureComponent implements OnInit {
    loading: boolean = true;
    facturelist: Facture[] = [];
    facturelisto: Facture[] = [];
    borderaulist: Borderau[] = [];

    visibleaddmoal: boolean = false;
    header!: string;

    constructor(
        private FactureService: FactureService,
        private BorderauService: BorderauService,
        private messageService: MessageService,
        private reportService: ReportService
    ) {}

    ngOnInit() {
        this.getAllFacture();
        this.iniData();
    }

    iniData() {
        setTimeout(() => {
            this.BorderauService.getAllWhoNoUseTocreateFacture().subscribe(
                (data) => {
                    this.borderaulist = data;
                    // this.messageService.add({severity: 'success', summary: 'Success', detail: 'Success'});
                },
                (error) => {
                    console.log(error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
                }
            );
        });
    }

    filterFacture(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        if (filterValue.length > 0) {
            this.facturelist = this.facturelist.filter((facture) => facture.numero?.toLowerCase().includes(filterValue.toLowerCase()));
        } else {
            this.facturelist = this.facturelisto;
        }
    }

    showDialog() {
        this.visibleaddmoal = true;
        this.header = 'Ajouter une facture';
    }

    getAllFacture() {
        this.loading = true;
        setTimeout(() => {
            this.FactureService.getAll().subscribe(
                (data) => {
                    this.loading = false;
                    this.facturelisto = this.facturelist = data;
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Success' });
                },
                (error) => {
                    console.log(error);
                    this.loading = false;
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
                }
            );
        });
    }

    deletefacture(id: string) {
        this.FactureService.DeleteDAta(id).subscribe(
            (data) => {
                this.facturelisto = this.facturelist = this.facturelist.filter((facture) => facture.id !== id);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Success' });
            },
            (error) => {
                console.log(error);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
            }
        );
    }
    generate(numero: string) {
        this.reportService.genereateReport(numero);
        setTimeout(() => {
            this.reportService.toastMessage.subscribe((data) => {
                this.messageService.add(data);
            });
        }, 2000);
    }
}
