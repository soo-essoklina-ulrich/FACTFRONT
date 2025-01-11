import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {DialogService} from 'primeng/dynamicdialog';
import {MydynamicdialogComponent} from '../../layout/component/mydynamicdialog/mydynamicdialog.component';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    private dialogService: DialogService,
    private http: HttpClient,
    private router: Router
  ) {
  }

  logout() {
    this.http.post(environment.api_ulr + 'auth/logout', {}).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
    this.router.navigate(['/connexion']).then(r => console.log(r));
    localStorage.clear();
  }

  gotologinpage() {
    const ref = this.dialogService.open(MydynamicdialogComponent, {
      header: 'Veiller vous connecter',
      width: '22rem',
      modal: true,
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000,
      data: {message: "Vous avez été déconnecté, veuillez vous reconnecter"}
    })
  }
}
