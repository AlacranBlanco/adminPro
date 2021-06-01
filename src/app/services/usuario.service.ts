import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterForm} from "../interfaces/register-form.interface";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {LoginForm} from "../interfaces/login-form.interface";
import {catchError, map, tap} from "rxjs/operators";
import {Usuario} from "../models/usuario";

const base_url = environment.base_url;
declare const gapi: any

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any
  // @ts-ignore
  public usuario: Usuario;

  constructor(private httpClient: HttpClient) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  googleInit() {
    return new Promise<void>(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '642097759422-pd24eppctotpcq9hik1seifck9qaq9ua.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
        });
        resolve();
      });
    })

  }

  logOut() {
    localStorage.removeItem('token');
    this.auth2.signOut();
  }

  validarToken(): Observable<boolean> {

    return this.httpClient.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const {email, google, name, role, uid = '', img} = resp.usuario;
        this.usuario = new Usuario(email, name, '', img, google, uid, role);
        localStorage.setItem('token', resp.token)
        return true;
      }),
      catchError(() => of(false))
    );
  }

  crearUsuario(formData: RegisterForm): Observable<any> {
    return this.httpClient.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }

  actualizarPerfil(data: { email: string, nombre: string, role: string }) {

    data = {
      ...data,
      // @ts-ignore
      role: this.usuario.role
    };

    return this.httpClient.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    })
  }

  login(formData: LoginForm): Observable<any> {
    return this.httpClient.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }

  loginGoogle(token: string): Observable<any> {
    return this.httpClient.post(`${base_url}/login/google`, {token})
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }

}
