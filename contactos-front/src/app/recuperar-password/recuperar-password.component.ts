import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RecuperarPasswordService } from '../api/recuperar-password.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { passwordEmail } from './model/rec-password.interface';
import swal from 'sweetalert';

@Component({
  selector: 'app-recuperar-password',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './recuperar-password.component.html',
  styleUrl: './recuperar-password.component.css'
})
export default class RecuperarPasswordComponent {

  private readonly _passwordService = inject(RecuperarPasswordService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);

  formGroup: FormGroup = this._formBuilder.group({
    email: '',
    password: ''
  });

  //el ? indica q no es requerido
  password(): void{
    const correoElectronico: string = this.formGroup.get('email')?.value;
    const password: string = this.formGroup.get('password')?.value

    const dataPaasword: passwordEmail = {
      correoElectronico,
      password
    }

  this._passwordService.password(dataPaasword).subscribe(
    responce => {
      swal('!Exito', 'La contraseña se ha cambiado y se ha enviado a su email', 'success');
      this._router.navigate(['/login']);
      this.formGroup.reset();
  },
  error => {
    swal('!Error', 'Hubo un error al intentar cambiar la contraseña', 'error');
    console.log(error);
  }
  )

  };





}
