import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'connexion', pathMatch: 'full'},
  {
    path: 'connexion',
    loadComponent: () => import('./authentication/login/login.component').then(c => c.LoginComponent)
  },

];
