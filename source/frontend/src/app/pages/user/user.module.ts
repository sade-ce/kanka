import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeModule} from '../../@theme/theme.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserFormComponent} from './user-form/user-form.component';
import {UserListComponent} from './user-list/user-list.component';
import {NbDialogModule} from '@nebular/theme';

@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbDialogModule.forChild(),
  ],
  entryComponents: [
    UserFormComponent,
  ],
})
export class UserModule {
}
