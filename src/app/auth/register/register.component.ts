import {Component, OnDestroy, OnInit} from '@angular/core';
import Swal from 'sweetalert2'
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {UsuarioService} from "../../services/usuario.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {

  public formSubmitted = false;
  private subscription: Subscription = new Subscription();

  public registerForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
    terminos: [false, [Validators.required, this.terminoValido]]
  }, {
    validators: this.passwordIguales('password', 'password2')
  });


  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private router: Router) {
  }

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return
    }


    this.subscription.add(this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(resp => {
        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      })
    );

  }

  compoNoValido(campo: string): boolean {
    return !!(this.registerForm.get(campo)?.invalid && this.formSubmitted);
  }

  contrasenasNoValidas(): boolean {
    return this.registerForm.get('password')?.value !== this.registerForm.get('password2')?.value && this.formSubmitted;
  }

  passwordIguales(pass1: string, pass2: string) {
    return (control: AbstractControl): ValidationErrors | null | any => {
      const pass1Control = control.get(pass1);
      const pass2Control = control.get(pass2);
      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({noEsIgual: true})
      }
    }
  }

  terminoValido(control: AbstractControl): ValidationErrors | null | any {
    const terminoVal = control.value;
    return terminoVal ? null : {isFalse: true}
  }

  aceptaTerminos(): boolean {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  ngOnDestroy() {
    console.log(this.subscription);
    this.subscription.unsubscribe();
  }

}
