import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {UtilisateurDto} from "../../models/Utilisateur";
import {Tag} from "primeng/tag";
import {Button} from "primeng/button";
import {Step, StepItem, StepPanel, Stepper} from "primeng/stepper";
import {InputText} from "primeng/inputtext";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";
import {Password} from "primeng/password";
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-profile',
    imports: [
        Tag,
        Button,
        StepItem,
        Step,
        StepPanel,
        Stepper,
        InputText,
        ReactiveFormsModule,
        FormsModule,
        Password,
        Toast
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
    providers: [
        MessageService
    ]
})
export class ProfileComponent implements OnInit {
    protected Utilisateur!: UtilisateurDto | null;
    protected formChangePassword!: FormGroup;

    constructor(
        private UserService: UserService,
        private msg: MessageService
    ) {
    }

    ngOnInit() {
        this.UtilisateurConnected();
        this.createformchangepassword();
    }

    createformchangepassword() {
        this.formChangePassword = this.UserService.createformchangepassword();
    }

    UtilisateurConnected() {
        this.UserService.data$.subscribe((data) => {
            this.Utilisateur = data;
        });
    }

    changePassword() {
        if (this.formChangePassword.valid) {
            const passworddto = {
                oldPassword: this.formChangePassword.value.password,
                newPassword: this.formChangePassword.value.newpassword
            }
            console.log(passworddto);
            this.UserService.changepassword(passworddto).subscribe(
                (data) => {

                    data ?this.msg.add({severity: 'success', summary: 'Succès', detail: 'Mot de passe modifié avec succès'}) : this.msg.add({severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la modification du mot de passe'});
                },
                (error) => {
                    console.log(error);
                    this.msg.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'Erreur lors de la modification du mot de passe'
                    });
                }
            );
        }
        else {
            this.msg.add({severity: 'error', summary: 'Erreur', detail: 'Veuillez remplir les champs correctement'});
        }
    }
}
