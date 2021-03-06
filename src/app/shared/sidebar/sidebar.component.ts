import {Component, OnInit} from '@angular/core';
import {SidebarService} from "../../services/sidebar.service";
import {UsuarioService} from "../../services/usuario.service";
import {Usuario} from "../../models/usuario";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  public usuarioInfo: Usuario;

  constructor(public sideBarService: SidebarService, private usuarioService: UsuarioService) {
    this.sideBarService.cargarMenu();
    this.menuItems = sideBarService.menu;
    this.usuarioInfo = usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
