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

@Component({
    selector: 'app-client',
    imports: [
        LoaderComponent,
        Toast,
        TableModule,
        Button,
        Tooltip,
        InputText,
        Tag
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

    constructor(
        private ClientService: ClientService,
        private messageService: MessageService
    ) {
    }

    ngOnInit() {
        this.getClients();
    }

    filterGlobal(event: Event) {

    }

    showAddClientModal() {

    }

    getClients() {
        this.loading = true;
        setTimeout(() => {
            this.ClientService.getClients().subscribe(
                (data) => {
                    this.clientso = this.clients = data;
                    this.loading = false;
                },
                (error) => {
                    this.messageService.add({severity: 'warning', summary: 'Error', detail: 'Error'});
                    this.loading = false;
                }
            )
        }, 2000)
    }

    editClient(id:string) {

    }

    deleteClient(id:string) {
        setTimeout(() => {
            this.ClientService.deleteClient(id).subscribe(
                (data) => {
                    this.clientso = this.clients = this.clients.filter((client) => client.id !== id);
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Client deleted successfully'});
                },
                (error) => {
                    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error'});
                }
            )
        }, 2000)
    }
}
