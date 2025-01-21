import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {DatePipe, NgIf} from "@angular/common";
import {InputText} from "primeng/inputtext";
import {LoaderComponent} from "../../../layout/component/loader/loader.component";
import {TableModule} from "primeng/table";
import {Toast} from "primeng/toast";
import {Tooltip} from "primeng/tooltip";
import {Borderau} from "../../../models/dossier/Borderau";
import {BorderauService} from "../../../services/dossier/borderau.service";
import {MessageService} from "primeng/api";
import {ProformaService} from "../../../services/dossier/proforma.service";
import {Proforma} from "../../../models/dossier/Proforma";
import {FactureService} from "../../../services/dossier/facture.service";
import {Dialog} from "primeng/dialog";
import {Select} from "primeng/select";
import {FormsModule} from "@angular/forms";
import {ReportService} from "../../../services/report/report.service";

@Component({
    selector: 'app-borderau',
    imports: [
        Button,
        DatePipe,
        InputText,
        LoaderComponent,
        TableModule,
        Toast,
        Tooltip,
        Dialog,
        Select,
        FormsModule,
        NgIf
    ],
    templateUrl: './borderau.component.html',
    styleUrl: './borderau.component.scss',
    providers: [
        MessageService
    ]
})
export class BorderauComponent implements OnInit{
    loading: boolean = true;
    borderaulist: Borderau[] = [];
    borderaulisto: Borderau[] = [];
    proformalist: Proforma[] = [];

    visibleaddmoal: boolean = false;
    header!: string;

    proforma_selected_id!:string

    constructor(
        private borderauService: BorderauService,
        private messageService: MessageService,
        private proformaService: ProformaService,
        private factureService: FactureService,
        private reportService: ReportService
    ) {
    }
    ngOnInit() {
        this.initData();
        this.getAllBorderau()
    }

    initData() {
        this.proformaService.getAllnotAdopted().subscribe((data) => {
                this.proformalist = data;
            },
            error => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error'});
            }
        );
    }

    filterBorderau($event
                   :
                   Event
    ) {
        const value = ($event.target as HTMLInputElement).value;
        if (value.length > 0) {
            this.borderaulist = this.borderaulist.filter((item) => {
                return item.reference.toLowerCase().includes(value.toLowerCase())
            });
        } else {
            this.borderaulist = this.borderaulisto;
        }
    }

    getAllBorderau() {
        this.loading = true;
        setTimeout(() => {
            this.borderauService.getAll().subscribe((data) => {
                    this.borderaulist = this.borderaulisto = data;
                    this.loading = false;
                },
                error => {
                    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error'});
                    this.loading = false;
                });
        }, 2000)
    }

    deleteborderau(id: string) {
        this.borderauService.DeleteDAta(id).subscribe(
            () => {
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Borderau supprimé'});
            this.borderaulisto = this.borderaulist = this.borderaulist.filter((item) => item.id !== id);
        }, error => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error'});
        });

    }

    CreateFacture(id: string) {
        this.factureService.PostData(id).subscribe((data) => {

            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Facture creer'});
        }, error => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.message});
        });
    }

    showDialog() {
        this.visibleaddmoal = true;
        this.header = 'Ajouter un borderau';
    }

    createborderau() {
        if (!this.proforma_selected_id) {

            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Selectionner une proforma'});
            return;
        }
        setTimeout(() => {
            this.borderauService.PostData(this.proforma_selected_id).subscribe((data) => {
                this.proformalist = this.proformalist.filter((item) => item.id !== this.proforma_selected_id);
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Borderau creer'});
                this.borderaulisto = this.borderaulist = [...this.borderaulist, data];
                this.visibleaddmoal = false;
                this.proforma_selected_id='';
            }, error => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.message});
            });
        });
    }


    generate(numero: string) {
        setTimeout(
            () => {
                this.reportService.genereateReport(numero).subscribe(
                    rep => {
                        this.messageService.add({
                            severity: 'info',
                            summary: 'Report',
                            detail: 'Generate Success'
                        })
                    },
                    error => {
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Report',
                            detail: 'Nom Generate'
                        })
                    }
                )
            }, 2000
        )
    }

    download(numero: string) {
        setTimeout(
            () => {
                this.reportService.downloadReport(numero).subscribe(
                    rep => {
                        this.messageService.add({
                            severity: 'info',
                            summary: 'Report',
                            detail: 'Download'

                        })
                    },
                    error => {
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Report',
                            detail: 'Download Refuser'

                        })
                    }
                )
            }, 2000
        )
    }
}
