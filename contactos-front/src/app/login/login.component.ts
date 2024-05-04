import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../api/login.service';
import swal from 'sweetalert';
import { LoginDto } from './models/login.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export default class LoginComponent {

private readonly _loginService = inject(LoginService);
private readonly _formBuilder = inject(FormBuilder);
private readonly _route = inject(Router);

  formGroup: FormGroup = this._formBuilder.group({
    email: ['',[Validators.required, Validators.email]],
    password: ''
  });

  validarDatos(): void {
    // Verifica si el formulario es válido
    if (this.formGroup.valid) {
        // Obtiene los valores de los controles directamente del formulario reactivo
        const correoElectronico: string = this.formGroup.value.email;
        const password: string = this.formGroup.value.password;

        // Agrupa los datos de inicio de sesión en un objeto
        const loginData: LoginDto = {
            correoElectronico,
            password
        };

        // Envía los datos de inicio de sesión al servicio
        this._loginService.validarUsuario(loginData).subscribe(
            token => {
                // Maneja la respuesta del servicio
                localStorage.setItem('token', token.access_token);
                localStorage.setItem('idUsuario', token.idUsuario.toString());

                swal({
                    title: "¡Éxito!",
                    text: "Usuario autenticado",
                    icon: "success",
                    buttons: {
                        confirm: {
                            text: "Aceptar",
                            value: true
                        }
                    }
                }).then((value) => {
                    if (value) {
                        // Redirige al usuario después de 1 segundo
                        setTimeout(() => {
                            // Evita que se recargue la página al navegar a esta ruta
                            this._route.navigate(['contactos'], { replaceUrl: true });
                        }, 1000);
                    }
                });
            },
            error => {
                // Maneja el error de autenticación
                console.log(error);
                swal("!Error", 'La Contraseña o Email son incorrectos', 'error');
                this.formGroup.reset();
            }
        );
    } else {
        // Si el formulario no es válido, no realiza ninguna acción
        return;
    }
}

  
}
//alzatejuan1280@gmail.com
