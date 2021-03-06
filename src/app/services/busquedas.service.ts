import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CargarUsuario} from "../interfaces/cargar-usuarios.interface";
import {environment} from "../../environments/environment";
import {map} from 'rxjs/operators';
import {Usuario} from "../models/usuario";
import {Hospital} from "../models/hospital";
import {Medico} from "../models/medico";

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
      user => new Usuario(user.email, user.name, '', user.img, user.google, user.uid, user.role)
    )
  }

  private transformarHospitales(resultados: any[]): Hospital[] {
    return resultados;
  }

  private transformarMedicos(resultados: any[]): Medico[] {
    return resultados;
  }

  busquedaGlobal(termino: string){
    const url = `${base_url}/todo/${termino}`;
    return this.httpClient.get(url, this.headers);
  }

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string = '') {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.httpClient.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(resp.resultados);
            case 'hospitales':
              return this.transformarHospitales(resp.resultados);
            case 'medicos':
              return this.transformarMedicos(resp.resultados);
            default:
              return [];
          }
        })
      )
  }
}
