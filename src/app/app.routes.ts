import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'connexion', pathMatch: 'full'},
  {
    path: 'connexion',
    loadComponent: () => import('./authentication/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./layout/layout.component').then(c => c.LayoutComponent),
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', loadComponent: () => import('./home/dashboard/dashboard.component').then(c => c.DashboardComponent)},
      {path: 'user', loadComponent: () => import('./home/user/user.component').then(c => c.UserComponent)},
      {path: 'article', loadComponent: () => import('./home/article/article.component').then(c => c.ArticleComponent)},
      {path: 'profile', loadComponent: () => import('./home/profile/profile.component').then(c => c.ProfileComponent)},
    ]

  },

];
