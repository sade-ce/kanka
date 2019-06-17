

import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserData } from '../../interfaces/common/users';
import { UsersService } from './services/users.service';
import { UsersApi } from './api/users.api';
import { HttpService } from './api/http.service';

const API = [UsersApi, HttpService];

const SERVICES = [
  { provide: UserData, useClass: UsersService },
];

@NgModule({
  imports: [CommonModule],
})
export class CommonBackendModule {
  static forRoot(): ModuleWithProviders {
    // tslint:disable-next-line:no-angle-bracket-type-assertion
    return <ModuleWithProviders> {
      ngModule: CommonBackendModule,
      providers: [
        ...API,
        ...SERVICES,
      ],
    };
  }
}
