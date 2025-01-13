import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilisateurDto} from '../../models/Utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.api_ulr + `user`

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {
  }


  createFormSave() {
    return this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      numero: ['', Validators.required, Validators.pattern('^[0-9]*$')],
      username: ['', Validators.required, Validators.minLength(4), Validators.maxLength(9)],
      password: ['', Validators.required],
    })
  }

  createFormUpdate() {
    return this.fb.group({
      id: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required, ],
      numero: ['', Validators.required, ],
    })
  }


  getAllorOnebyEmail(email?: string) {
    return this.http.get<UtilisateurDto[]>(this.url + (email ? `/${email}` : ''))
  }

  create(user: UtilisateurDto) {
    return this.http.post<UtilisateurDto>(this.url, user)
  }

  update(id:string, user: UtilisateurDto) {
    return this.http.put<UtilisateurDto>(this.url+`/${id}`, user)
  }

  delete(id: string) {
    return this.http.delete<null>(this.url + `/${id}`)
  }

  activateorDesactivate(id: string) {
    return this.http.get<boolean>(this.url + `/${id}/activate`)

  }
}
