import {Component, OnDestroy, OnInit} from '@angular/core';
import {HospitalService} from "../../../services/hospital.service";
import {Hospital} from "../../../models/hospital";
import Swal from 'sweetalert2';
import {ModalImagenService} from "../../../services/modal-imagen.service";
import {delay} from "rxjs/operators";
import {Subscription} from "rxjs";
import {BusquedasService} from "../../../services/busquedas.service";
import {Usuario} from "../../../models/usuario";

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public hospitalesTmp: Hospital[] = [];
  public imbSubs: Subscription = new Subscription();

  constructor(private hospitalService: HospitalService,
              private modalImagen: ModalImagenService,
              private busquedaService: BusquedasService) {
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imbSubs.add(this.modalImagen.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(() => this.cargarHospitales()));
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        this.hospitales = hospitales;
        this.hospitalesTmp = hospitales;
        this.cargando = false;
      });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id!, hospital.name)
      .subscribe(resp => {
        Swal.fire('Actualizado', hospital.name, 'success');
      })
  }

  eliminarHospital(hospital: Hospital) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar el ${hospital.name}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.eliminarHospital(hospital._id!)
          .subscribe(() => {
            this.hospitales = this.hospitales.filter(item => item._id !== hospital._id && item);
            Swal.fire(
              'Eliminado!',
              hospital.name,
              'success'
            )
          })
      }
    })
  }

  async abrirSweetAlert() {
    const {value} = await Swal.fire<string>({
      title: 'Crear hospital',
      input: 'text',
      inputLabel: 'Nombre del hopsital',
      inputPlaceholder: 'Nombre del hopsital',
      showCancelButton: true
    })


    // @ts-ignore
    if (value?.trim().length > 0) {
      this.hospitalService.crearHospital(value!)
        .subscribe((resp: any) => {
          this.hospitales.push(resp.hospital);
        })
    }
  }

  buscar(termino: string) {
    if (termino) {
      this.busquedaService.buscar('hospitales', termino)
        .subscribe(resp => {
          this.hospitales = resp;
        });
    } else {
      this.hospitales = this.hospitalesTmp;
    }
  }

  abrirModal(hospital: Hospital) {
    // @ts-ignore
    this.modalImagen.abrirModal('hospitales', hospital._id, hospital.img);
  }

  ngOnDestroy(): void {
    this.imbSubs.unsubscribe();
  }

}
