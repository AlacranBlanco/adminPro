import {Component, OnInit} from '@angular/core';
import {ModalImagenService} from "../../services/modal-imagen.service";
import Swal from "sweetalert2";
import {FileUploadService} from "../../services/file-upload.service";

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: []
})
export class ModalImagenComponent implements OnInit {

  // @ts-ignore
  public imagenSubir: File;
  public imgTmp: string | ArrayBuffer | null = "";


  constructor(public modalImage: ModalImagenService, public fileUploadService: FileUploadService) {
  }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTmp = null;
    this.modalImage.cerrarModal();
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
    const id = this.modalImage.id;
    const tipo = this.modalImage.tipo;

    // @ts-ignore
    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
      .then(img => {
        Swal.fire('Guardado', 'Los cambios fueron guardados correctamente', 'success')
        this.modalImage.nuevaImagen.emit(img);
        this.cerrarModal();
      }).catch(err => {
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    });
  }


}
