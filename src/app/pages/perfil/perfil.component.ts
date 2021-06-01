import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsuarioService} from "../../services/usuario.service";
import {Usuario} from "../../models/usuario";
import {FileUploadService} from "../../services/file-upload.service";
import {Event} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  // @ts-ignore
  public profileForm: FormGroup;
  public usuario: Usuario;
  // @ts-ignore
  public imagenSubir: File;
  public imgTmp: string | ArrayBuffer | null = "";

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private fileUploadService: FileUploadService) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: [this.usuario.name, [Validators.required]],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.profileForm.value)
      .subscribe(() => {
        const {name, email} = this.profileForm.value;
        this.usuario.name = name;
        this.usuario.email = email;
        Swal.fire('Guardado', 'Los cambios fueron guardados correctamente', 'success')
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      })
  }

  cambiarImagen(event: any) {
    this.imagenSubir = event.target.files[0];
    if (!event.target.files[0]) {
      return this.imgTmp = "";
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      this.imgTmp = reader.result;
    }
    return this.imgTmp;
  }

  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then(img => {
        this.usuario.img = img
        Swal.fire('Guardado', 'Los cambios fueron guardados correctamente', 'success')
      }).catch(err => {
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    });
  }

}
