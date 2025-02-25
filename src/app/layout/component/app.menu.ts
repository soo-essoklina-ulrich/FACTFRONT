import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `
        <ul class="layout-menu">
            <ng-container *ngFor="let item of model; let i = index">
                <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
                <li *ngIf="item.separator" class="menu-separator"></li>
            </ng-container>
        </ul>
    `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/home'] }]
            },
            {
                label: 'Gestion Utilisateur',
                items: [{ label: 'User List', icon: 'pi pi-fw pi-users', routerLink: ['/home/user'] }]
            },
            {
                label: 'Projet - Client',
                items: [
                    { label: 'Projet', icon: 'pi pi-fw pi-briefcase', routerLink: ['/home/projet'] },
                    { label: 'Client List', icon: 'pi pi-fw pi-user', routerLink: ['/home/client'] }
                ]
            },
            {
                label: 'Dossier',
                items: [
                    { label: 'Proforma', icon: 'pi pi-fw pi-file', routerLink: ['/home/proforma'] },
                    { label: 'Borderau', icon: 'pi pi-fw pi-file', routerLink: ['/home/borderau'] },
                    { label: 'Facture', icon: 'pi pi-fw pi-file', routerLink: ['/home/facture'] }
                ]
            },
            {
                label: 'Gestion Article',
                items: [{ label: 'Article', icon: 'pi pi-fw pi-tags', routerLink: ['/home/article'] }]
            },
            {
                label: 'Me',
                items: [{ label: 'Profile', icon: 'pi pi-fw pi-spin pi-cog', routerLink: ['/home/profile'] }]
            }
        ];
    }
}
