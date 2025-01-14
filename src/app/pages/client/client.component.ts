import {Component, OnInit} from '@angular/core';
import {LoaderComponent} from "../../layout/component/loader/loader.component";
import {Toast} from "primeng/toast";
import {MessageService} from "primeng/api";
import {TableModule} from "primeng/table";
import {Button} from "primeng/button";
import {Tooltip} from "primeng/tooltip";
import {Client} from "../../models/Client";
import {ClientService} from "../../services/client/client.service";
import {InputText} from "primeng/inputtext";
import {Tag} from "primeng/tag";
import {Dialog} from "primeng/dialog";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Checkbox} from "primeng/checkbox";
import {Password} from "primeng/password";
import {InputNumber} from "primeng/inputnumber";

@Component({
    selector: 'app-client',
    imports: [
        LoaderComponent,
        Toast,
        TableModule,
        Button,
        Tooltip,
        InputText,
        Tag,
        Dialog,
        Checkbox,
        FormsModule,
        Password,
        ReactiveFormsModule,
        InputNumber
    ],
    templateUrl: './client.component.html',
    styleUrl: './client.component.scss',
    providers: [
        MessageService
    ]
})
export class ClientComponent implements OnInit {
    loading: boolean = true;
    clients: Client[] = [];
    clientso: Client[] = [];
    client!: Client;

    visibleaddmoal: boolean = false;
    visibleeditmoal: boolean = false;
    dialogheader!: string;

    form!: FormGroup;

    constructor(
        private ClientService: ClientService,
        private messageService: MessageService
    ) {
    }

    ngOnInit() {
        this.createform();
        this.getClients();
    }

    private createform() {
        this.form = this.ClientService.crateForm();
    }

    filterGlobal(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        if (value.length>0){
            this.clients = this.clients.filter((client) => client.nom.toLowerCase().includes(value.toLowerCase())|| client.sigle.toLowerCase().includes(value.toLowerCase()));
        }else {
            this.clients = this.clientso;
        }
    }

    showAddClientModal() {
        this.dialogheader = 'Ajout Client';
        this.visibleaddmoal = true;
    }

    saveClient() {
        this.ClientService.saveClient(this.form.value).subscribe(
            (data) => {
                this.clientso = this.clients = [...this.clients, data];
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Client added successfully'});
                this.visibleaddmoal = false;
            },
            (error) => {
                console.log(error);
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error'});
            }
        )
    }

    getClients() {
        this.loading = true;
        setTimeout(() => {
            this.ClientService.getClients().subscribe(
                (data) => {
                    this.clientso = this.clients = data.sort((a, b) => a.nom.localeCompare(b.nom));
                    this.loading = false;
                },
                (error) => {
                    this.messageService.add({severity: 'warning', summary: 'Error', detail: 'Error'});
                    this.loading = false;
                }
            )
        }, 2000)
    }

    editClient(id: string) {
        this.dialogheader = 'Edit Client';
        this.client = this.clients.find((client) => client.id === id) as Client;
        this.form.patchValue(this.client);
        this.visibleeditmoal = true;
    }

    deleteClient(id: string) {
        setTimeout(() => {
            this.ClientService.deleteClient(id).subscribe(
                (data) => {
                    this.clientso = this.clients = this.clients.filter((client) => client.id !== id);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Client deleted successfully'
                    });
                },
                (error) => {
                    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error'});
                }
            )
        }, 2000)
    }
}
