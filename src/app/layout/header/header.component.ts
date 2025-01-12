import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {LogoutService} from '../../services/auth/logout.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  constructor(
    private logoutService: LogoutService
  ) {
  }

  logout() {
    this.logoutService.logout();
  }
}
