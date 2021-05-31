export class Usuario {
  constructor(
    public email: string,
    public name: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public uid?: string,
    public role?: string,
  ) {

  }
}
