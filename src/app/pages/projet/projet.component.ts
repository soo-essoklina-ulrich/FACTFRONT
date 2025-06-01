import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../../services/projet/projet.service';
import { MessageService } from 'primeng/api';
import { Projet } from '../../models/Projet';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '../../layout/component/loader/loader.component';
import { TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { DatePipe } from '@angular/common';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Dialog } from 'primeng/dialog';
import { Checkbox } from 'primeng/checkbox';
import { FloatLabel } from 'primeng/floatlabel';
import { Textarea } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { Client } from '../../models/Client';
import { ClientService } from '../../services/client/client.service';

@Component({
    selector: 'app-projet',
    imports: [LoaderComponent, TableModule, Toast, Button, InputText, Tooltip, DatePipe, ToggleSwitch, FormsModule, Dialog, ReactiveFormsModule, Checkbox, FloatLabel, Textarea, Select],
    templateUrl: './projet.component.html',
    styleUrl: './projet.component.scss',
    providers: [MessageService],
})
export class ProjetComponent implements OnInit {
    loading: boolean = true;

    projetlisto: Projet[] = [];
    projetlist: Projet[] = [];
    projet!: Projet;

    visibleaddmoal: boolean = false;
    visibleeditmoal: boolean = false;
    dialogheader!: string;

    form!: FormGroup;
    formupdate!: FormGroup;
    clients: Client[] = [];

    constructor(
        private projetService: ProjetService,
        private messageService: MessageService,
        private clientService: ClientService
    ) {}

    ngOnInit(): void {
        this.createform();
        this.getProjets();
        this.getAllClient();
    }

    createform() {
        this.form = this.projetService.createProjetFrom();
        this.formupdate = this.projetService.createProjetUpdateFrom();
    }

    getAllClient() {
        this.clientService.getClients().subscribe(
            (data) => {
                this.clients = data;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getProjets() {
        this.loading = true;
        setTimeout(() => {
            this.projetService.getAllProjet().subscribe(
                (data) => {
                    this.projetlisto = this.projetlist = data.sort((a, b) => a.projet_type.localeCompare(b.projet_type));
                    this.loading = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Projet recuperer avec succes',
                    });
                },
                (error) => {
                    console.log(error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Erreur de recuperation des projets',
                    });
                    this.loading = false;
                }
            );
        }, 1000);
    }

    saveProjet() {
        this.projetService.saveProjet(this.form.value).subscribe(
            (data) => {
                this.projetlisto.push(data);
                this.projetlist = this.projetlisto.sort((a, b) => a.projet_type.localeCompare(b.projet_type));
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Projet enregistrer avec succes',
                });
                this.visibleaddmoal = false;
                this.form.reset();
            },
            (error) => {
                console.log(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: "Erreur d'enregistrement du projet",
                });
            }
        );
    }

    updateProjet() {
        this.projetService.updateProjet(this.formupdate.value, this.projet.id).subscribe(
            (data) => {
                this.projetlisto = this.projetlist = this.projetlisto.map((p) => (p.id === data.id ? data : p));
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Projet modifier avec succes',
                });
                this.visibleeditmoal = false;
                this.formupdate.reset();
            },
            (error) => {
                console.log(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Erreur de modification du projet',
                });
            }
        );
    }

    deleteProjet(id: string) {
        this.projetService.deleteProjet(id).subscribe(
            (data) => {
                this.projetlisto = this.projetlist = this.projetlisto.filter((p) => p.id !== id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Projet supprimer avec succes',
                });
            },
            (error) => {
                console.log(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Erreur de suppression du projet',
                });
            }
        );
    }

    changeOffre(id: string) {
        this.projetService.changeOffre(id).subscribe(
            (data) => {
                this.projetlisto = this.projetlist = this.projetlist.map((p) =>
                    p.id === id
                        ? {
                              ...p,
                              offre: data,
                              update_at: new Date(),
                          }
                        : p
                );

                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Offre changer avec succes',
                });
            },
            (error) => {
                console.log(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: "Erreur de changement de l'offre",
                });
            }
        );
    }

    showDialog() {
        this.visibleaddmoal = true;
        this.dialogheader = 'Ajouter un projet';
    }

    showEditDialog(id: string) {
        this.visibleeditmoal = true;
        this.dialogheader = 'Modifier un projet';
        this.projet = this.projetlisto.find((p) => p.id === id) as Projet;
        this.formupdate.setValue({
            projet_type: this.projet.projet_type,
            description: this.projet.description,
            offre: this.projet.offre,
        });
    }

    filterProjet(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        if (value) {
            this.projetlist = this.projetlisto.filter((p) => p.projet_type.toLowerCase().includes(value.toLowerCase()));
        } else {
            this.projetlist = this.projetlisto;
        }
    }
}
