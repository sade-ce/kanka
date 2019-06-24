import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { Menu } from '@app/core/models/menu.model';
import { environment as env} from '@env/environment';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '@app/core/services/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  isLoggedIn$: Observable<boolean>;
  username$: Observable<string>;
  public isAdmin$ = new BehaviorSubject(false);
  public isManager$ = new BehaviorSubject(false);

  subscription: Subscription;



// todo: yetki sevivesine göre  menüyü görüntüleme
  dashboard: Menu;
  adminMenu: Menu;
  managerMenu: Menu;


  envName = env.envName;
  appName = env.appName;
  year = new Date().getFullYear();
  isProd = env.production;



  // kullanım https://alligator.io/angular/breakpoints-angular-cdk/
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) {



                this.dashboard = {
                  title: 'Dashboard',
                  icon: 'dashboard',
                  link: '/dashboard',
                  pages: []
                };


                this.adminMenu = {
                  title: 'Yönetim',
                  icon: 'settings',
                  pages: [
                    {
                      title: 'Kullanıcıları Yönet',
                      link: '/admin/user/',
                      icon: 'person'
                    }

                  ]
                };


                this.managerMenu = {
                  title: 'Kullanıcı Menusu',
                  icon: 'local_activity',
                  pages: [
                    {
                      title: 'Yeni İşlemler',
                      link: '/yen',
                      icon: 'list'
                    },
                  ]
                };



              }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isAuthenticated();
    this.username$ = this.authService.getUsernameAsync();

    this.subscription = this.authService.getRoleAsync().subscribe( (data: any) => {

        if (data && typeof data === 'object' && data.constructor === Array)  {
          if (data.some(x => x === 'Admin')) {
            this.isAdmin$.next(true);
          }
          if (data.some(x => x === 'Manager')) {
            this.isManager$.next(true);
          }
        } else {
          if (data === 'Admin') {
            this.isAdmin$.next(true);
          }
          if (data === 'Manager') {
            this.isManager$.next(true);
          }
        }
    });
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
