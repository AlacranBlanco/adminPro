import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterForm} from "../interfaces/register-form.interface";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {LoginForm} from "../interfaces/login-form.interface";
import {catchError, map, tap} from "rxjs/operators";

const base_url = environment.base_url;
declare const gapi: any

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any

  constructor(private httpClient: HttpClient) {
    this.googleInit();
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
    const token = localStorage.getItem('token') || '';
    return this.httpClient.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      }),
      map(resp => true),
      catchError(error => of(false))
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
