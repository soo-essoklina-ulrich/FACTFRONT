import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {DatePipe} from "@angular/common";
import {InputText} from "primeng/inputtext";
import {LoaderComponent} from "../../../layout/component/loader/loader.component";
import {TableModule} from "primeng/table";
import {Toast} from "primeng/toast";
import {Tooltip} from "primeng/tooltip";
import {Proforma} from "../../../models/dossier/Proforma";
import {ProformaService} from "../../../services/dossier/proforma.service";
import {MessageService} from "primeng/api";
import {Tag} from "primeng/tag";
import {FormGroup} from "@angular/forms";
import {Dialog} from "primeng/dialog";
import {ProfomaFormComponent} from "../../../layout/component/profoma-form/profoma-form.component";
import {data} from "autoprefixer";
import {BorderauService} from "../../../services/dossier/borderau.service";

@Component({
    selector: 'app-proforma',
    imports: [
        Button,
        DatePipe,
        InputText,
        LoaderComponent,
        TableModule,
        Toast,
        Tooltip,
        Tag,
        Dialog,
        ProfomaFormComponent
    ],
    templateUrl: './proforma.component.html',
    styleUrl: './proforma.component.scss',
    providers: [
        MessageService
    ]
})
export class ProformaComponent implements OnInit {
    loading: boolean = true;
    proformalist: Proforma[] = [];
    proformalisto: Proforma[] = [];

    // modal
    dialogheader!: string;
    visibleaddmoalproforma: boolean = false;

    profomasave!: Proforma;




    constructor(
        private ProformaService: ProformaService,
        private borderauService: BorderauService,
        private messageService: MessageService
    ) {
    }

    ngOnInit() {
        this.getAllProforma();
    }

    filterProforma(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        if(value.length>0){
            this.proformalist = this.proformalist.filter(value1 => value1.numero.toLowerCase().includes(value.toLowerCase()));
        }
        else {
            this.proformalist = this.proformalisto;
        }
    }

    showDialog() {
        this.dialogheader = 'Creer un Proforma';
        this.visibleaddmoalproforma = true;
    }

    addProformaTolist(data: Proforma | null){
        if (data) {
            this.proformalist.push(data)
            this.visibleaddmoalproforma = false;
            this.messageService.add(
                {
                    severity: 'success',
                    summary: 'Succes',
                    detail: 'Proforma Creer'
                }
            )
        }
    }

    getAllProforma() {
        this.loading = true;
        setTimeout(() => {
            this.ProformaService.getAll().subscribe(
                data => {
                    this.proformalisto = this.proformalist = data;
                    this.loading = false;
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Proforma recuperer avec success'});
                },
                error => {
                    console.log(error);
                    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Proforma non recuperer'});
                    this.loading = false;
                }
            );
        }, 2000);
    }

    getseverity(adopded: boolean) {
        return adopded ? 'success' : 'secondary';
    }

    adopedAndCreateBorderau(id:string) {

    }

    deleteproforma(numero: string) {
        this.ProformaService.DeleteDAta(numero).subscribe(
            data => {
                console.log(data);
                this.proformalisto = this.proformalisto.filter(value => value.numero !== numero);
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Proforma supprimer avec success'});
            },
            error => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Proforma non supprimer'});
                console.log(error);
            }
        );
    }

    showEditDialog(id:string) {

    }

    protected readonly data = data;

}
