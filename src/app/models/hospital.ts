interface _hospitalUser {
  _id: string,
  nombre: string,
  img: string

}
export class Hospital {
  constructor(
    public name: string,
    public _id?: string,
    public usuario?: _hospitalUser,
    public img?: string,
  ) {
  }
}
