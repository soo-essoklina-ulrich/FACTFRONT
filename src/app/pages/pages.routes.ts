import { Routes } from '@angular/router';
import {ArticleComponent} from "./article/article.component";
import {Dashboard} from "./dashboard/dashboard";
import {ClientComponent} from "./client/client.component";
import {UserComponent} from "./user/user.component";
import {ProjetComponent} from "./projet/projet.component";


export default [

    { path: '', redirectTo:'dash', pathMatch: 'full' },
    { path: 'dash', component:Dashboard, title: 'Dash' },
    { path: 'user', component:UserComponent, title: 'Utilisateur' },
    { path: 'projet', component:ProjetComponent, title: 'Projet' },
    { path: 'client', component:ClientComponent, title: 'Client' },
    { path: 'article', component:ArticleComponent, title: 'Article' },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
