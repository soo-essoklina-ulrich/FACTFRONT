import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {Login} from '../../models/Utilisateur';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private api = environment.api_ulr + 'auth/login';


  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {
  }

  createLoginForm() {
    return this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(credentials: Login) {
    return this.http.post<{bearer:string,refresh:string}>(this.api, credentials)
  }
}
