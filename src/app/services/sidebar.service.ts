import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  cargarMenu() {
    // @ts-ignore
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }

  /* menu: any[] = [
     {
       titulo: 'Dashboard', icon: 'mdi mdi-gauge', submenu: [
         {titulo: 'Main', url: '/'},
         {titulo: 'ProgressBar', url: 'progress'},
         {titulo: 'Gráficas', url: 'grafica1'},
         {titulo: 'Promesas', url: 'promesas'},
         {titulo: 'Rxjs', url: 'rxjs'},
       ]
     },
     {
       titulo: 'Mantenimiento', icon: 'mdi mdi-folder-lock-open', submenu: [
         {titulo: 'Usuarios', url: 'usuarios'},
         {titulo: 'Hospitales', url: 'hospitales'},
         {titulo: 'Médicos', url: 'medicos'}
       ]
     }
   ];*/


}
