import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CargarUsuario} from "../interfaces/cargar-usuarios.interface";
import {map, tap} from "rxjs/operators";
import {Usuario} from "../models/usuario";
import {environment} from "../../environments/environment";
import {Hospital} from "../models/hospital";
import {RegisterForm} from "../interfaces/register-form.interface";
import {Observable} from "rxjs";

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private httpClient: HttpClient) {
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarHospitales() {
    const url = `${base_url}/hospitales`;
    return this.httpClient.get(url, this.headers)
      .pipe(
        // @ts-ignore
        map((resp: { ok: true, hospitales: Hospital[] }) => resp.hospitales)
      )
  }

  crearHospital(name: string): Observable<any> {
    const url = `${base_url}/hospitales`;
    return this.httpClient.post(url, {name}, this.headers);
  }

  actualizarHospital(_id: string, name: string): Observable<any> {
    const url = `${base_url}/hospitales/${_id}`;
    return this.httpClient.put(url, {name}, this.headers);
  }

  eliminarHospital(_id: string): Observable<any> {
    const url = `${base_url}/hospitales/${_id}`;
    return this.httpClient.delete(url, this.headers);
  }

}
