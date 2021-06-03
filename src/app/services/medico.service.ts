import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Medico} from "../models/medico";

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private httpClient: HttpClient) { }

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

  cargarMedicos() {
    const url = `${base_url}/medicos`;
    return this.httpClient.get(url, this.headers)
      .pipe(
        // @ts-ignore
        map((resp: { ok: true, medicos: Medico[] }) => resp.medicos)
      )
  }

  crearMedicos(medico: { nombre: string, hospital: string }): Observable<any> {
    const url = `${base_url}/medicos`;
    return this.httpClient.post(url, medico, this.headers);
  }

  obtenerMedicoById(id: string): Observable<any> {
    const url = `${base_url}/medicos/${id}`;
    return this.httpClient.get(url, this.headers)
      .pipe(
        // @ts-ignore
        map((resp: { ok: true, medico: Medico[] }) => resp.medico)
      )
  }

  actualizarMedicos(medico: Medico): Observable<any> {
    const url = `${base_url}/medicos/${medico._id}`;
    return this.httpClient.put(url, medico, this.headers);
  }

  eliminarMedicos(_id: string): Observable<any> {
    const url = `${base_url}/medicos/${_id}`;
    return this.httpClient.delete(url, this.headers);
  }


}
