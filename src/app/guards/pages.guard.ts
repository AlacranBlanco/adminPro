import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UsuarioService} from "../services/usuario.service";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PagesGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.usuarioService.validarToken()
      .pipe(
        tap(isAuth => {
          if (!isAuth) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }

}
