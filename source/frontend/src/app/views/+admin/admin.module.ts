import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { RoleGuard } from '@app/core/guards/role.guard';


import { ListCountryComponent } from './country/list-country/list-country.component';
import { AddCountryComponent } from './country/add-country/add-country.component';
import { EditCountryComponent } from './country/edit-country/edit-country.component';

import { EditUserComponent } from './user/edit-user/edit-user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { UserAddRoleComponent } from './user/user-add-role/user-add-role.component';

import { CountryResolver } from './resolvers/country.resolver';
import { UserResolver } from './resolvers/user.resolver';

import {
  Paginator
} from '@app/core/models/core';

const routes: Routes = [
  {
    path: 'country',
    component: ListCountryComponent,
    data: {title: 'Ülke Listesi', expectedRole: ['Admin']},
    canActivate: [RoleGuard],
    resolve: {
      data: CountryResolver
    }
  },
  {
    path: 'country/add',
    component: AddCountryComponent,
    data: {title: 'Ülke ekle', expectedRole: ['Admin']},
    canActivate: [RoleGuard],
  },
  {
    path: 'country/edit/:id',
    component: EditCountryComponent,
    data: {title: 'Ülke Düzenle', expectedRole: ['Admin']},
    canActivate: [RoleGuard],
  },

  {
    path: 'user',
    component: ListUserComponent,
    data: {title: 'Kullanıcı Listele', expectedRole: ['Admin']},
    canActivate: [RoleGuard],
    resolve: {
      data: UserResolver
    }
  },
  {
    path: 'user/add',
    component: AddUserComponent,
    data: {title: 'Kullanıcı ekle', expectedRole: ['Admin']},
    canActivate: [RoleGuard],
  },
  {
    path: 'user/add_role/:id',
    component: UserAddRoleComponent,
    data: {title: 'Kullanıcı rol ekle', expectedRole: ['Admin']},
    canActivate: [RoleGuard],
  },
  {
    path: 'user/edit/:id',
    component: EditUserComponent,
    data: {title: 'Kullanıcı Düzenle', expectedRole: ['Admin']},
    canActivate: [RoleGuard],
  },

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ListUserComponent, AddUserComponent, EditUserComponent, UserAddRoleComponent,
    ListCountryComponent, AddCountryComponent, EditCountryComponent,
  ],
  providers: [
    UserResolver,
    CountryResolver,
  ]
})
export class AdminModule { }
