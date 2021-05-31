import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {UsuarioService} from "../../services/usuario.service";
import Swal from 'sweetalert2';
import {Subscription} from "rxjs";

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy, OnInit {

  public formSubmitted = false;
  public auth2: any;
  private susbcription: Subscription[] = [];

  public loginForm = this.formBuilder.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]
  });


  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone: NgZone) {
  }


  login() {
    this.susbcription.push(this.usuarioService.login(this.loginForm.value)
      .subscribe(resp => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }
        this.ngZone.run(() => {
          this.router.navigateByUrl('/');
        })
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      })
    );
  }


  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp();

  }

  async startApp() {
      await this.usuarioService.googleInit();
      this.auth2 = this.usuarioService.auth2;
      this.attachSignin(document.getElementById('my-signin2'));
  };

  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.susbcription.push(this.usuarioService.loginGoogle(id_token).subscribe(resp => {
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          })
        }));

      }, function (error: any) {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngOnInit() {
    this.renderButton();
  }

  ngOnDestroy(): void {
    this.susbcription.forEach(sub => sub.unsubscribe());
  }

}
