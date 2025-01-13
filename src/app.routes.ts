import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';


import { Notfound } from './app/pages/notfound/notfound';

export const appRoutes: Routes = [
    {path: '', redirectTo: '/auth', pathMatch: 'full'},
    {
        path: 'home',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
