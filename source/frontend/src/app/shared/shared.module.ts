import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { GuestSelectorComponent } from './components/guest-selector/guest-selector.component';
import { CustomMatPaginatorIntl } from './lib/mat-paginator-intl';

import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatMenuModule,
  MatTooltipModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatListModule,
  MatExpansionModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorIntl,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule,
  MatChipsModule,
  MatSelectModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatDividerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatStepperModule,
  MatSlideToggleModule,
  MatTabsModule,

} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { CdkTableModule } from '@angular/cdk/table';
@NgModule({
  declarations: [ConfirmComponent, LayoutComponent, NavMenuComponent, GuestSelectorComponent],

  imports: [
    CommonModule,
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatListModule,
    MatExpansionModule,
    MatGridListModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatListModule,
    MatExpansionModule,
    MatGridListModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmComponent,
    LayoutComponent,
    NavMenuComponent,
    GuestSelectorComponent
  ],
  entryComponents: [
    ConfirmComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ],
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}

