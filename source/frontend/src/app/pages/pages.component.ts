import { Component, OnInit, OnDestroy } from '@angular/core';

import { ADMİN_MENU_ITEMS, MANAGER_MENU_ITEMS } from './pages-menu';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '@app/core/services/core';
import { Router } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </sample-layout>
  `,
})
export class PagesComponent implements OnInit, OnDestroy {
  isLoggedIn$: Observable<boolean>;
  username$: Observable<string>;
  public isAdmin$ = new BehaviorSubject(false);
  public isManager$ = new BehaviorSubject(false);
  subscription: Subscription;

  menu: NbMenuItem[]  = [
    {
      title: 'Dashboard',
      icon: 'home-outline',
      link: '/pages/dashboard',
      home: true,
    }]; /*  = ADMİN_MENU_ITEMS; */
  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthService,

              private router: Router) {}

              ngOnInit() {
                this.isLoggedIn$ = this.authService.isAuthenticated();
                this.username$ = this.authService.getUsernameAsync();

                this.subscription = this.authService.getRoleAsync().subscribe( (data: any) => {
                  console.log(data);

                  if (data && typeof data === 'object' && data.constructor === Array)  {
                      if (data.some(x => x === 'Admin')) {
                        this.isAdmin$.next(true);
                        this.menu = ADMİN_MENU_ITEMS;
                      }
                      if (data.some(x => x === 'Manager')) {
                        this.isManager$.next(true);
                        this.menu = MANAGER_MENU_ITEMS;
                      }
                    } else {
                      if (data === 'Admin') {
                        this.isAdmin$.next(true);
                        this.menu = ADMİN_MENU_ITEMS;
                      }
                      if (data === 'Manager') {
                        this.isManager$.next(true);
                        this.menu = MANAGER_MENU_ITEMS;
                      }
                    }
                });

              }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
