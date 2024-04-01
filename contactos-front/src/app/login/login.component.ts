import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../api/login.service';
import swal from 'sweetalert';
import { trigger, transition, style, animate } from '@angular/animations';
import { LoginDto } from './models/login.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
   animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})


export default class LoginComponent {

 private readonly _loginService = inject(LoginService);
 private readonly _formBuilder = inject(FormBuilder);
 private readonly _route = inject(Router);
 
  formGroup: FormGroup = this._formBuilder.group({
    email: '',
    password: ''
  });

  validarDatos(): void {
    const correoElectronico: string = this.formGroup.get('email')?.value;
    const password: string = this.formGroup.get('password')?.value;

    //agrupo los inputs en el objeto
    const loginData: LoginDto = {
      correoElectronico,
      password
    }
    
    //guardo el token en el local storage y el id del usuario en una variable y reset borra los datos del formulario despues de cada accion
    this._loginService.validarUsuario(loginData).subscribe(
      token => {
        localStorage.setItem('token', token.access_token)
        localStorage.setItem('idUsuario', token.idUsuario.toString());

        swal({
          title: "Exito!",
          text: "Usuario autenticado!",
          icon: "success",
          buttons: {
            confirm: {
              text: "Aceptar",
              value: true
            }
          }
          //demora la transición a la siguiente pagina
        }).then((value) => {
          if (value) {
            setTimeout(()=>{
              this._route.navigate(['contactos']);
            },1000)
          }
        });
        
      },
      error => {
        console.log(error);
        swal("!Error", 'La Contraseña o Email son incorrectos', 'error');
        this.formGroup.reset();
      }
    );
  }

  
}
//alzatejuan1280@gmail.com
