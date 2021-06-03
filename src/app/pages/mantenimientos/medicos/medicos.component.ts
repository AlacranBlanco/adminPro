import {Component, OnDestroy, OnInit} from '@angular/core';
import {Medico} from 'src/app/models/medico';
import {MedicoService} from "../../../services/medico.service";
import {ModalImagenService} from "../../../services/modal-imagen.service";
import {BusquedasService} from "../../../services/busquedas.service";
import {delay} from "rxjs/operators";
import {Subscription} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public cargando: boolean = true;
  public medicosTmp: Medico[] = [];
  public imbSubs: Subscription = new Subscription();

  constructor(private medicoSerivce: MedicoService,
              private modalImageService: ModalImagenService,
              private busquedaService: BusquedasService) {
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imbSubs.add(this.modalImageService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(() => this.cargarMedicos()));
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoSerivce.cargarMedicos()
      .subscribe(medicos => {
        this.cargando = false;
        this.medicosTmp = medicos;
        this.medicos = medicos;
      })
  }

  abrirModal(medico: Medico) {
    this.modalImageService.abrirModal('medicos', medico._id!, medico.img);
  }

  buscar(termino: string) {
    if (termino) {
      this.busquedaService.buscar('medicos', termino)
        .subscribe(resp => {
          this.medicos = resp;
        });
    } else {
      this.medicos = this.medicosTmp;
    }
  }

  borraMedico(medico: Medico) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar el ${medico.name}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoSerivce.eliminarMedicos(medico._id!)
          .subscribe(() => {
            this.medicos = this.medicos.filter(item => item._id !== medico._id && item);
            Swal.fire(
              'Eliminado!',
              medico.name,
              'success'
            )
          })
      }
    })
  }

  ngOnDestroy(): void {
    this.imbSubs.unsubscribe();
  }

}
