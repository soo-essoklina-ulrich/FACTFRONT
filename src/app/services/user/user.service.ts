import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {UtilisateurDto} from '../../models/Utilisateur';
import {BehaviorSubject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.api_ulr + `user`
    private dataSubject = new BehaviorSubject<UtilisateurDto|null>(null);
    public data$ = this.dataSubject.asObservable();

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

  createformchangepassword(){
      return this.fb.group({
            password: ['', Validators.required],
            newpassword: ['', Validators.required],
            confirmpassword: ['', Validators.required]
      })
  }


    // Validateur personnalisé pour vérifier que newpassword et confirmpassword correspondent
    passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const newPassword = control.get('newpassword')?.value;
        const confirmPassword = control.get('confirmpassword')?.value;

        // Si les deux champs sont remplis et ne correspondent pas, retourne une erreur
        if (newPassword && confirmPassword && newPassword !== confirmPassword) {
            return { passwordMismatch: true };
        }
        return null; // Pas d'erreur
    };

  getAllorOnebyEmail(email?: string) {
    return this.http.get<UtilisateurDto[]>(this.url + (email ? `/${email}` : ''))
  }

  getUserconnected() {
    return this.http.get<UtilisateurDto>(this.url + `/me`).pipe(
        tap(data => this.dataSubject.next(data))
    ).subscribe();
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

  changepassword(
      value:{
          oldPassword: string,
          newPassword: string
      }
  ){
     return this.http.post<boolean>(this.url + `/change-password`, value)
  }
}
