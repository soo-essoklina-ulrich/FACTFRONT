import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Notfound } from './app/pages/notfound/notfound';
import { homeguardGuard } from './app/services/guard/homeguard.guard';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    {
        path: 'home',
        component: AppLayout,
        children: [{ path: '', loadChildren: () => import('./app/pages/pages.routes') }],
        canActivate: [homeguardGuard],
        canActivateChild: [homeguardGuard]
    },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
