import {Component, NgZone, OnInit} from '@angular/core';
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";
import {Usuario} from "../../models/usuario";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent {

  public usuarioInfo: Usuario;
  public userImageUrl = "";

  constructor(private usuarioService: UsuarioService, private router: Router, private ngZone: NgZone) {
    this.usuarioInfo = usuarioService.usuario;
    this.userImageUrl = usuarioService.usuario.getImagenUrl;

  }

  logOut() {
    this.usuarioService.logOut();
    this.ngZone.run(() => {
      this.router.navigateByUrl('/login');
    })
  }

}
