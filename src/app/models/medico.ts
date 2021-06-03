import {Hospital} from "./hospital";

interface _medicoUser {
  _id: string,
  nombre: string,
  img: string
}


export class Medico {
  constructor(
    public name: string,
    public _id?: string,
    public img?: string,
    public usuario?: _medicoUser,
    public hospital?: Hospital
  ) {
  }
}
