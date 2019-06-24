import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { AuthGuard } from './core/guards/core';
 

const routes: Routes = [
  {path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard]},
  {path: '', redirectTo: 'pages', pathMatch: 'full'},
  {path: '**', redirectTo: 'pages'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
