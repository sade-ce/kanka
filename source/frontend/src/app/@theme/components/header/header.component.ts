import {Component, Input, OnInit} from '@angular/core';

import {NbMenuService, NbSidebarService} from '@nebular/theme';

import {Router} from '@angular/router';
import { AuthService } from '@app/core/services/core';

@Component({
  selector: 'header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  logout() {
    this.authService.logout() ;
    this.router.navigate(['auth/login']);

  }
}
