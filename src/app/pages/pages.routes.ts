import { Routes } from '@angular/router';
import {ArticleComponent} from "./article/article.component";
import {Dashboard} from "./dashboard/dashboard";


export default [

    { path: '', redirectTo:'dash', pathMatch: 'full' },
    { path: 'dash', component:Dashboard, title: 'dash' },
    { path: 'article', component:ArticleComponent, title: 'Article' },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
