import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsuarioService} from "../../../services/usuario.service";
import {Usuario} from "../../../models/usuario";
import {BusquedasService} from "../../../services/busquedas.service";
import Swal from 'sweetalert2';
import {ModalImagenService} from "../../../services/modal-imagen.service";
import {delay} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuarioTmp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imbSubs: Subscription = new Subscription();

  constructor(private usuarioService: UsuarioService,
              private busquedaService: BusquedasService,
              private modalImagen: ModalImagenService) {
  }

  ngOnInit(): void {
    this.actualizarTabla();
    this.imbSubs.add(this.modalImagen.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(() => this.actualizarTabla()));
  }

  actualizarTabla() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({total, usuarios}) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuarioTmp = usuarios;
        this.cargando = false;
      })
  }


  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }
    this.actualizarTabla();
  }

  buscar(termino: string) {
    if (termino) {
      this.busquedaService.buscar('usuarios', termino)
        .subscribe(resp => {
          this.usuarios = resp;
        });
    } else {
      this.usuarios = this.usuarioTmp;
    }
  }

  eliminarUsuario(usuario: Usuario) {
    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error', 'No puedes borrarte a ti mismo', 'error');
    }
    return Swal.fire({
      title: '¿Borrar usuario?',
      text: `Está a punto de borrar a ${usuario.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.eliminarUsuario(usuario)
          .subscribe(() => {
            Swal.fire(
              'Usuario eliminado!',
              `El usuario ${usuario.name} fue eliminado correctamente.`,
              'success'
            );
            if (this.usuarios.length === 1 && this.desde > 0) {
              this.desde -= 5;
            }
            this.actualizarTabla();
          });
      }
    })
  }

  cambiarRole(usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario)
      .subscribe(resp => {

      }, error => {
        Swal.fire(
          'Usuario eliminado!',
          `Hubo un error, comunicate con el administrador`,
          'success'
        );
      })
  }

  abrirModal(usuario: Usuario) {
    // @ts-ignore
    this.modalImagen.abrirModal('usuarios', usuario.uid, usuario.img);
  }

  ngOnDestroy(): void {
    this.imbSubs.unsubscribe();
  }
}
