import {Component, NgZone, OnInit} from '@angular/core';
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent {

  constructor(private usuarioService: UsuarioService, private router: Router, private ngZone: NgZone) {
  }

  logOut() {
    this.usuarioService.logOut();
    this.ngZone.run(() => {
      this.router.navigateByUrl('/login');
    })
  }

}
