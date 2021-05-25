import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import {PagesRoutingModule} from "./pages/pages.routing";
import {AuthRoutingModule} from "./auth/auth.routing";

import {NopagefoundComponent} from "./pages/nopagefound/nopagefound.component";

const routes: Routes = [

  // path: '/dashboard' PageRouting
  // path: '/login' AuthRouting

  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', component: NopagefoundComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
