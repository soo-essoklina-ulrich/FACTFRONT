import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MenuItem} from './MenuItem';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './aside.component.html',
})
export class AsideComponent implements OnInit{
  menuItems:MenuItem[] = [];

  ngOnInit(): void {
      throw new Error('Method not implemented.');
  }


}
