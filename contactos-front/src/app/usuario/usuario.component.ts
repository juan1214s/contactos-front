import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../api/usuario.service';
import { Usuario } from './model/usuario.interface';
import swal from 'sweetalert';


@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export default class UsuarioComponent {
private readonly _formBuilder = inject(FormBuilder);
private readonly _usuarioService = inject(UsuarioService);
private readonly _router = inject(Router)

//capturo los inputs del formulario
formGroup: FormGroup = this._formBuilder.group({
  nombre: '',
  apellido: '',
  email: '',
  password: ''
});

crearUsuario(): void{
  //void indica q la funcion no devuelve ningun valor
const nombre: string = this.formGroup.get('nombre')?.value;
const apellido: string = this.formGroup.get('apellido')?.value; 
const correoElectronico: string = this.formGroup.get('email')?.value; 
const password: string = this.formGroup.get('password')?.value; 

//creo un objeto con los valores de los campos para enviarlos en el cuerpo de la solicitud
const usuarioData: Usuario = {
  nombre,
  apellido,
  correoElectronico,
  password
};

//el reset borra el formulario, router es para q al llenarse el formulario y confirmar el envio se redirecciona al login
this._usuarioService.crearUsuario(usuarioData).subscribe(
  responce => {
    swal('!EXITO', 'Usuario creado con exito', 'success');
    this.formGroup.reset();
    this._router.navigate(['/login']);
  },
  error => {
    swal('!Error', 'Error al crear el usuario', 'error');
    console.log(`El error es: ${error.message}`);
    this.formGroup.reset();
  }
  )

}

}
