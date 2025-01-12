import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MenuItem} from './MenuItem';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './aside.component.html',
})
export class AsideComponent implements OnInit {
  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.menuItems = [
      {
        label: "HOME",
        submenu: [
          {label: "Dashboard", icon: "ti ti-layout-dashboard", link: "/home/dashboard"}
        ]
      },

      {
        label: "Gestion Utilisateur", submenu: [
          {label: "user list", icon: "fa-solid fa-people-group", link: "/home/user"},
        ]
      },
      {
        label: "Gestion Facture", submenu: [
          {label: "Proforma", icon: "fa-solid fa-file-lines", link: "/home/proforma"},
          {label: "Borderaux", icon: "fa-solid fa-file", link: "/home/borderaux"},
          {label: "Facture", icon: "fa-solid fa-file-invoice-dollar", link: "/home/facture"},
        ]
      },
      {
        label: "Complement", submenu: [
          {label: "Article", icon: "fa-solid fa-tags", link: "/home/article"},
        ]
      },
      {
        label: "Profile", submenu: [
          {label: "profile", icon: "fa-solid fa-user", link: "/home/profile"},
        ]
      },
    ]
  }


}
