import {Component, OnInit} from '@angular/core';
import {ToastModule} from 'primeng/toast';
import {UserService} from '../../services/user/user.service';
import {UtilisateurDto} from '../../models/Utilisateur';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Column} from '../../models/Table';
import {LoaderComponent} from '../../layout/component/loader/loader.component';
import {TableModule} from 'primeng/table';
import {ButtonDirective} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {KeyValuePipe, LowerCasePipe, NgIf, TitleCasePipe} from '@angular/common';
import {TagModule} from 'primeng/tag';
import {CheckboxModule} from 'primeng/checkbox';
import {InputSwitchModule} from 'primeng/inputswitch';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    ToastModule,
    LoaderComponent,
    TableModule,
    TooltipModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    NgIf,
    KeyValuePipe,
    TitleCasePipe,
    ButtonDirective,
    TagModule,
    CheckboxModule,
    InputSwitchModule,
    FormsModule,
    LowerCasePipe
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  providers: [
    MessageService
  ]
})
export class UserComponent implements OnInit {

  protected visisbleadd: boolean = false
  protected visisbleupdate: boolean = false

  protected formadd!: FormGroup;
  protected formupdate!: FormGroup;


  protected user!: UtilisateurDto
  protected userso: UtilisateurDto[] = []
  protected users: UtilisateurDto[] = []
  protected columns!: Column[];
  loading: boolean = true;

  constructor(
    private UserService: UserService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.crateForm();
    this.getALl();
    this.cratetableColumns();
  }

  cratetableColumns() {
    this.columns = [
      {field: 'nom', header: 'Nom'},
      {field: 'prenom', header: 'Prenom'},
      {field: 'email', header: 'Email'},
      {field: 'telephone', header: 'Numero'},
      {field: 'username', header: 'Username'},
      {field: 'role', header: 'Role'},
    ]
  }

  crateForm() {
    this.formadd = this.UserService.createFormSave();
    this.formupdate = this.UserService.createFormUpdate();
  }

  getALl() {
    this.UserService.getAllorOnebyEmail().subscribe(
      (data) => {
        this.users = data
        this.userso = data
        this.loading = false
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Users getted'});
      },
      (error) => {
        console.log(error)
        this.messageService.add({severity: 'error', summary: 'Error', detail: error.message});
      }
    )
  }

  filterGlobal(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    if (value.length > 0) {
      this.users = this.users.filter((item) =>
        item.nom.toLowerCase().includes(value) || item.prenom.toLowerCase().includes(value) || item.email.toLowerCase().includes(value) || item.telephone.toString().includes(value) || item.username.toLowerCase().includes(value)
      );
    } else {
      this.users = this.userso
    }
  }

  showAddUserModal() {
    this.visisbleadd = true
  }

  showUpdateUserModal(id: string) {
    this.user = this.users.find((item) => item.id === id) as UtilisateurDto
    console.log(this.user)


    const userinfo = {
      id: this.user.id,
      nom: this.user.nom,
      prenom: this.user.prenom,
      email: this.user.email,
      numero: this.user.telephone,

    };
    this.formupdate.patchValue(userinfo);
    console.log(this.formupdate.value);
    this.visisbleupdate = true;

  }

  addUser() {
    this.UserService.create(this.formadd.value).subscribe(
      (res) => {
        this.users.push(res as UtilisateurDto)
        this.userso = this.users
        this.visisbleadd = false
        this.formadd.reset()
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'User added successfully'});
      },
      (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail});
      }
    );
  }
  upadateUser() {
    this.UserService.update(this.formupdate.value.id, this.formupdate.value).subscribe(
      (res) => {
        this.users = this.users.map((item) => item.id === this.formupdate.value.id ? res as UtilisateurDto : item)
        this.userso = this.users
        this.visisbleupdate = false
        this.formupdate.reset()
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'User updated successfully'});
      },
      (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail});
      }
    );
  }

  activateorDesactivate(id:string) {
    this.UserService.activateorDesactivate(id).subscribe(
      (res) => {
        this.users.forEach(
          (item) => {
            if (item.id === id) {
              if (typeof res === "boolean") {
                item.actif = res
              }
            }
          }
        )
        this.userso = this.users
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'User activate successfully'});
      },
      (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail});
      }
    )
  }
}
