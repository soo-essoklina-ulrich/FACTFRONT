import {Component, OnInit} from '@angular/core';
import {LoaderComponent} from "../../layout/component/loader/loader.component";
import {TableModule} from "primeng/table";
import {Toast} from "primeng/toast";
import {UtilisateurDto} from "../../models/Utilisateur";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";
import {UserService} from "../../services/user/user.service";
import {DatePipe} from "@angular/common";
import {Button} from "primeng/button";
import {Tooltip} from "primeng/tooltip";
import {InputText} from "primeng/inputtext";
import {Dialog} from "primeng/dialog";
import {InputNumber} from "primeng/inputnumber";
import {Password} from "primeng/password";
import {ToggleSwitch} from "primeng/toggleswitch";

@Component({
    selector: 'app-user',
    imports: [
        LoaderComponent,
        TableModule,
        Toast,
        DatePipe,
        Button,
        Tooltip,
        InputText,
        Dialog,
        ReactiveFormsModule,
        InputNumber,
        Password,
        ToggleSwitch,
        FormsModule
    ],
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss',
    providers: [
        MessageService
    ]
})
export class UserComponent implements OnInit {
    loading: boolean = true;
    userlisto: UtilisateurDto[] = [];
    userlist: UtilisateurDto[] = [];
    user!: UtilisateurDto;


    visibleaddmoal: boolean = false;
    visibleeditmoal: boolean = false;
    dialogheader!: string;

    form!: FormGroup;
    formupdate!: FormGroup;

    constructor(
        private UserService: UserService,
        private messageService: MessageService
    ) {
    }

    ngOnInit(): void {
        this.createform();
        this.getUsers();
    }


    createform() {
        this.form = this.UserService.createFormSave();
        this.formupdate = this.UserService.createFormUpdate();
    }

    getUsers() {
        this.loading = true;
        setTimeout(() => {
            this.UserService.getAllorOnebyEmail().subscribe(
                data => {
                    this.userlisto = data;
                    this.userlist = data;
                    this.loading = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Utilisateurs récupérés avec succès'
                    });
                },
                error => {
                    console.log(error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: error.error.message
                    });
                    this.loading = false;
                });
        }, 1000);
    }

    saveUser() {
        this.UserService.create(this.form.value).subscribe(
            (data) => {
                this.userlisto = this.userlist = [...this.userlist, data];
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Utilisateur ajouté avec succès'
                });
                this.visibleaddmoal = false;
                this.form.reset();
            },
            (error) => {
                console.log(error);
                this.messageService.add({severity: 'error', summary: 'Erreur', detail: error.error.message});
            }
        )
    }

    editUser() {
        this.UserService.update(this.formupdate.value.id, this.formupdate.value).subscribe(
            (data) => {
                this.userlisto = this.userlist = this.userlist.map(user => user.id === data.id ? data : user);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Utilisateur modifié avec succès'
                });
                this.visibleeditmoal = false;
                this.formupdate.reset();
            },
            (error) => {
                console.log(error);
                this.messageService.add({severity: 'error', summary: 'Erreur', detail: error.error.message});
            }
        )
    }

    supprimerUser(id: string) {
        this.UserService.delete(id).subscribe(
            () => {
                this.userlisto = this.userlist = this.userlist.filter(user => user.id !== id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Utilisateur supprimé avec succès'
                });
            },
            (error) => {
                console.log(error);
                this.messageService.add({severity: 'error', summary: 'Erreur', detail: error.error.message});
            }
        );
    }

    activerDesactiverUser(id: string) {
        setTimeout(() => {
            this.UserService.activateorDesactivate(id).subscribe(
                (data) => {
                    this.userlisto = this.userlist = this.userlist.map(user => user.id === id ? {
                        ...user,
                        actif: data
                    } : user);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: `Utilisateur ${data?'Active':'Desacter'} avec succès`
                    });
                },
                (error) => {
                    console.log(error);
                    this.messageService.add({severity: 'error', summary: 'Erreur', detail: error.error.message});
                }
            );
        });
    }

    showAddDialog() {
        this.dialogheader = 'Ajout Utilisateur';
        this.visibleaddmoal = true;
    }

    showEditDialog(id: string) {
        this.dialogheader = 'Modifier Utilisateur';
        this.user = this.userlist.find(user => user.id === id) as UtilisateurDto;
        const user = {
            id: this.user.id,
            nom: this.user.nom,
            prenom: this.user.prenom,
            email: this.user.email,
            numero: this.user.telephone
        }
        this.formupdate.patchValue(user);
        this.visibleeditmoal = true;
    }

    filterGlobal(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        if (value.length > 0) {
            this.userlist = this.userlist.filter(user => user.nom.toLowerCase().includes(value.toLowerCase())|| user.prenom.toLowerCase().includes(value.toLowerCase())|| user.email.toLowerCase().includes(value.toLowerCase()));
        } else {
            this.userlist = this.userlisto;
        }
    }
}
