
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  NbAuthJWTInterceptor,
  NbAuthModule,
  NbPasswordAuthStrategy,
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
  NbTokenLocalStorage,
} from '@nebular/auth';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { environment } from '../../environments/environment';
import { AuthPipe } from './auth.pipe';
import { RoleProvider } from './role.provider';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';

const GUARDS = [AuthGuard, AdminGuard];
const PIPES = [AuthPipe];

const socialLinks = [
  {
    url: 'https://github.com/samilsam/kanka',
    target: '_blank',
    icon: 'socicon-github',
  },
  {
    url: 'https://github.com/zinderud',
    target: '_blank',
    icon: 'socicon-github',
  },

];

export function filterInterceptorRequest(req: HttpRequest<any>): boolean {
  return ['/auth/login', '/auth/sign-up', '/auth/request-pass']
    .some(url => req.url.includes(url));
}

@NgModule({
  declarations: [...PIPES],
  imports: [
    CommonModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: environment.apiUrl,
          login: {
            endpoint: '/auth/login',
            method: 'post',
          },
          register: {
            endpoint: '/auth/sign-up',
            method: 'post',
          },
          logout: {
            endpoint: '/auth/sign-out',
            method: 'post',
          },
          requestPass: {
            endpoint: '/auth/request-pass',
            method: 'post',
          },
          resetPass: {
            endpoint: '/auth/reset-pass',
            method: 'post',
          },
          token: {
            key: 'token',
          },
        }),
      ],
      forms: {
        login: {
          socialLinks,
        },
        register: {
          socialLinks,
        },
      },
    }),
  ],
  exports: [...PIPES],
  providers: [
    NbSecurityModule.forRoot({
      accessControl: {
        guest: {
        },
        user: {
          parent: 'guest',
          view: ['kform', 'dictionary'],
          edit: ['kform', 'dictionary'],
        },
        admin: {
          parent: 'user',
          view: ['kform', 'orders', 'users'],
          edit: ['kform', 'orders', 'users'],
        },
      },
    }).providers,
    {
      provide: NbRoleProvider, useClass: RoleProvider,
    },
    {
      provide: NbTokenLocalStorage, useClass: NbTokenLocalStorage,
    },
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: filterInterceptorRequest },
        { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        ...GUARDS],
    } as ModuleWithProviders;
  }
}
