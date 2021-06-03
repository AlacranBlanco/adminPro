import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Hospital} from 'src/app/models/hospital';
import {Medico} from 'src/app/models/medico';
import Swal from 'sweetalert2';
import {HospitalService} from "../../../services/hospital.service";
import {MedicoService} from "../../../services/medico.service";
import {ActivatedRoute, Router} from "@angular/router";
import {delay} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit, OnDestroy {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public medicoSeleccionado: Medico | undefined;
  public hospitalSeleccionado: Hospital | undefined;
  public subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private hospitalService: HospitalService,
              private medicoService: MedicoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe(({id}) => this.cargarMedico(id)))

    this.cargarHospitales();
    this.medicoForm = this.formBuilder.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    })

    // @ts-ignore
    this.subscriptions.push(this.medicoForm.get('hospital')?.valueChanges
      .subscribe(id => {
        this.hospitalSeleccionado = this.hospitales.find(hospital => hospital._id === id)
      }))

  }

  cargarMedico(id: string) {
    this.subscriptions.push(this.medicoService.obtenerMedicoById(id)
      .pipe(
        delay(100)
      )
      .subscribe(medico => {
        const {name, hospital: {_id}} = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({name, hospital: _id});
      }));
  }

  cargarHospitales() {
    this.subscriptions.push(this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      }))
  }

  guardarMedico() {
    const {name} = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.subscriptions.push(this.medicoService.actualizarMedicos(data)
        .subscribe(resp => {
          Swal.fire('Actualizado', `${name} actualizado correctamente`, 'success');
        }))
    } else {
      this.subscriptions.push(this.medicoService.crearMedicos(this.medicoForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${name} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
        }))
    }

  }

}
