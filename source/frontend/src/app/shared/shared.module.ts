import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { GuestSelectorComponent } from './components/guest-selector/guest-selector.component';

@NgModule({
  declarations: [ConfirmComponent, LayoutComponent, NavMenuComponent, GuestSelectorComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
