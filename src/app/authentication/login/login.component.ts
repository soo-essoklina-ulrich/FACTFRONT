import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/auth/login.service';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';

import {NgIf} from '@angular/common';
import {MessagesModule} from 'primeng/messages';
import {Message} from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgIf,
    MessagesModule,
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  protected form!: FormGroup
  protected requestfail: boolean = false;
  protected message!: Message[];

  constructor(
    private LoginService: LoginService
  ) {
  }

  ngOnInit(): void {
    const element = document.querySelector('body')
    element!.classList.add('DEFAULT_THEME')
    this.createform()
  }

  private createform() {
    this.form = this.LoginService.createLoginForm()
  }

  protected login() {
    this.LoginService.login(this.form.value).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        this.requestfail = true
        this.message = [{severity: 'error', detail: error.error.detail}]
        console.log(error)
      }
    )
  }
}
