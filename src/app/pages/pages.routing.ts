import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PagesComponent} from "./pages.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {Grafica1Component} from "./grafica1/grafica1.component";
import {AccountSettingsComponent} from "./account-settings/account-settings.component";
import {PromesasComponent} from "./promesas/promesas.component";
import {RxjsComponent} from "./rxjs/rxjs.component";
import {PagesGuard} from "../guards/pages.guard";
import {PerfilComponent} from "./perfil/perfil.component";
import {UsuariosComponent} from "./mantenimientos/usuarios/usuarios.component";
import {HospitalesComponent} from "./mantenimientos/hospitales/hospitales.component";
import {MedicosComponent} from "./mantenimientos/medicos/medicos.component";
import {MedicoComponent} from "./mantenimientos/medicos/medico.component";
import {BusquedaComponent} from "./busqueda/busqueda.component";
import {AdminGuard} from "../guards/admin.guard";

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [PagesGuard],
    children: [
      {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
      {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de usuario'}},
      {path: 'buscar/:termino', component: BusquedaComponent, data: {titulo: 'Busquedas'}},
      {path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBar'}},
      {path: 'grafica1', component: Grafica1Component, data: {titulo: 'Grafica #1'}},
      {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de cuenta'}},
      {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
      {path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'}},

      // Mantenimientos
      {
        path: 'usuarios',
        canActivate: [AdminGuard],
        component: UsuariosComponent,
        data: {titulo: 'Usuarios de aplicaci??n'}
      },
      {
        path: 'hospitales',
        canActivate: [AdminGuard],
        component: HospitalesComponent,
        data: {titulo: 'Hospitales de aplicaci??n'}
      },
      {
        path: 'medicos',
        canActivate: [AdminGuard],
        component: MedicosComponent,
        data: {titulo: 'M??dicos de aplicaci??n'}
      },
      {
        path: 'medico/:id',
        canActivate: [AdminGuard],
        component: MedicoComponent,
        data: {titulo: 'M??dico de aplicaci??n'}
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule {
}
