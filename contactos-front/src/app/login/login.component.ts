import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginService } from '../api/login.service';
import swal from 'sweetalert';
import { pipe, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent {

 private readonly _loginService = inject(LoginService) 
 private readonly _formBuilder = inject(FormBuilder)

 
  formGroup: FormGroup = this._formBuilder.group({
    email: '',
    password: ''
  });

  validarDatos(): void {
    const email: string = this.formGroup.get('email')?.value;
    const password: string = this.formGroup.get('password')?.value;

    //guardo el token en el local storage y el id del usuario en una variable y reset borra los datos del formulario despues de cada accion
    this._loginService.validarUsuario(email, password).subscribe(
      token => {
        localStorage.setItem('token', token.access_token)
        swal("!EXITO", 'Usuario validado', 'success');
        this.formGroup.reset();
      },
      error => {
        console.log(error);
        swal("!Error", 'La Contraseña o Email son incorrectos', 'error');
        this.formGroup.reset();
      }
    );
  }

  
}
