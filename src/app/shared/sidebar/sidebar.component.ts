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
  public userImageUrl = "";

  constructor(private sideBarService: SidebarService, private usuarioService: UsuarioService) {
    this.menuItems = sideBarService.menu;
    this.usuarioInfo = usuarioService.usuario;
    this.userImageUrl = usuarioService.usuario.getImagenUrl;
  }

  ngOnInit(): void {
  }

}
