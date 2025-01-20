import { Routes } from '@angular/router';
import {ArticleComponent} from "./article/article.component";
import {Dashboard} from "./dashboard/dashboard";
import {ClientComponent} from "./client/client.component";
import {UserComponent} from "./user/user.component";
import {ProjetComponent} from "./projet/projet.component";
import {ProformaComponent} from "./dossier/proforma/proforma.component";
import {BorderauComponent} from "./dossier/borderau/borderau.component";
import {FactureComponent} from "./dossier/facture/facture.component";


export default [

    { path: '', redirectTo:'dash', pathMatch: 'full' },
    { path: 'dash', component:Dashboard, title: 'Dash' },
    { path: 'user', component:UserComponent, title: 'Utilisateur' },
    { path: 'projet', component:ProjetComponent, title: 'Projet' },
    { path: 'proforma', component:ProformaComponent, title: 'Proforma' },
    { path: 'borderau', component:BorderauComponent, title: 'Borderau' },
    { path: 'facture', component:FactureComponent, title: 'Facture' },
    { path: 'client', component:ClientComponent, title: 'Client' },
    { path: 'article', component:ArticleComponent, title: 'Article' },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
