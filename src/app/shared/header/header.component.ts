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

  constructor(private usuarioService: UsuarioService, private router: Router, private ngZone: NgZone) {
    this.usuarioInfo = usuarioService.usuario;

  }

  logOut() {
    this.usuarioService.logOut();
    this.ngZone.run(() => {
      this.router.navigateByUrl('/login');
    })
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.router.navigateByUrl('/dashboard');
    } else {
      this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
    }
  }

}
