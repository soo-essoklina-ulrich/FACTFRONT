import {Component, OnInit} from '@angular/core';
import {AsideComponent} from './aside/aside.component';
import {HeaderComponent} from './header/header.component';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from './footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    AsideComponent,
    HeaderComponent,
    RouterOutlet,
    FooterComponent
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  ngOnInit(): void {
    const element = document.querySelector('body')
    element!.className = '';
    element!.classList.add('bg-surface')
  }

}
