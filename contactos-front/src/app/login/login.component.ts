import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../api/login.service';
import { LoginDto } from './models/login.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export default class LoginComponent {
  private readonly _loginService = inject(LoginService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router)

  formGroup: FormGroup = this._formBuilder.group({
    email: '',
    password: '',
  });

  validarDatos(): void {
    const correoElectronico: string = this.formGroup.get('email')?.value;
    const password: string = this.formGroup.get('password')?.value;

    const loginData: LoginDto = {
      correoElectronico,
      password,
    };

    //guardo el token en el local storage y el id del usuario en una variable y reset borra los datos del formulario despues de cada accion
    this._loginService.validarUsuario(loginData).subscribe(
      (token) => {
        //reseteo el formulario
        this.formGroup.reset();
        //redirecciono a contactos
        setTimeout(()=> {
          this._router.navigate(['/contactos'])
        }, 1000)
        
      }
    );
  }

 public rutas(){
    this._router.navigate(['/login'])
  }
}
