import { Component, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { DatePipe, NgIf } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { LoaderComponent } from '../../../layout/component/loader/loader.component';
import { TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { Tooltip } from 'primeng/tooltip';
import { Proforma } from '../../../models/dossier/Proforma';
import { ProformaService } from '../../../services/dossier/proforma.service';
import { MessageService } from 'primeng/api';
import { Tag } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { ProfomaFormComponent } from '../../../layout/component/profoma-form/profoma-form.component';
import { BorderauService } from '../../../services/dossier/borderau.service';
import { ReportService } from '../../../services/report/report.service';

@Component({
    selector: 'app-proforma',
    imports: [Button, DatePipe, InputText, LoaderComponent, TableModule, Toast, Tooltip, Tag, Dialog, ProfomaFormComponent, FormsModule, NgIf],
    templateUrl: './proforma.component.html',
    styleUrl: './proforma.component.scss',
    providers: [MessageService]
})
export class ProformaComponent implements OnInit {
    loading: boolean = true;
    proformalist: Proforma[] = [];
    proformalisto: Proforma[] = [];

    // modal
    dialogheader!: string;
    visibleaddmoalproforma: boolean = false;

    profomasave!: Proforma;
    private oldrefernce!: string;

    constructor(
        private ProformaService: ProformaService,
        private borderauService: BorderauService,
        private messageService: MessageService,
        private reportService: ReportService
    ) {}

    ngOnInit() {
        this.getAllProforma();
    }

    filterProforma(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        if (value.length > 0) {
            this.proformalist = this.proformalist.filter((value1) => value1.numero.toLowerCase().includes(value.toLowerCase()));
        } else {
            this.proformalist = this.proformalisto;
        }
    }

    showDialog() {
        this.dialogheader = 'Creer un Proforma';
        this.visibleaddmoalproforma = true;
    }

    addProformaTolist(data: Proforma | null) {
        if (data) {
            this.proformalist.push(data);
            this.visibleaddmoalproforma = false;
            this.messageService.add({
                severity: 'success',
                summary: 'Succes',
                detail: 'Proforma Creer'
            });
        }
    }

    getAllProforma() {
        this.loading = true;
        setTimeout(() => {
            this.ProformaService.getAll().subscribe(
                (data) => {
                    this.proformalisto = this.proformalist = data;
                    this.loading = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Proforma recuperer avec success'
                    });
                },
                (error) => {
                    console.log(error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Proforma non recuperer' });
                    this.loading = false;
                }
            );
        }, 2000);
    }

    getseverity(adopded: boolean) {
        return adopded ? 'success' : 'secondary';
    }

    adopedAndCreateBorderau(id: string) {
        this.borderauService.PostData(id).subscribe(
            (data) => {
                this.proformalisto = this.proformalist = this.proformalist.map((value) =>
                    value.id === id
                        ? ({
                              ...value,
                              adopted: true
                          } as Proforma)
                        : value
                );
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Borderau creer avec success'
                });
            },
            (error) => {
                console.log(error);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Borderau non creer' });
            }
        );
    }

    deleteproforma(numero: string) {
        this.ProformaService.DeleteDAta(numero).subscribe(
            (data) => {
                console.log(data);
                this.proformalisto = this.proformalisto.filter((value) => value.numero !== numero);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Proforma supprimer avec success'
                });
            },
            (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Proforma non supprimer' });
                console.log(error);
            }
        );
    }

    showEditDialog(id: string) {}

    updaterefrence(id: string, newreference: string) {
        if (newreference === this.oldrefernce) {
            return;
        }

        this.ProformaService.updatereference(id, newreference).subscribe(
            (data) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Referncer mis a jour',
                    detail: 'Reference modifier avec success'
                });
            },
            (error) => {
                console.log(error);

                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Reference non modifier' });
            }
        );
    }

    caputeroldreference(reference: string) {
        this.oldrefernce = reference;
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
