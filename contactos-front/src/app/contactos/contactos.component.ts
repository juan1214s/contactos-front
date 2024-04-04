import { Component, inject} from '@angular/core';
import { ContactosService } from "../api/contactos.service"
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CardComponent } from './card/card.component';
import { BuscadorComponent } from '../buscador/buscador.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CrearContactosDto } from './model/contactos.interface';
import { catchError } from 'rxjs';
import swal from 'sweetalert';



@Component({
  selector: 'app-contactos',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardComponent, BuscadorComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export default class ContactosComponent{

private readonly ContactosService = inject(ContactosService);
private readonly _formBuilder = inject(FormBuilder)
private readonly _contactosService = inject(ContactosService);
contactos = this._contactosService.contactos

constructor(){
  //invierte el valor, porq se guarda en string y lo necesito convertir en numero
  const idUsuario = parseInt(localStorage.getItem('idUsuario') || '0');

  //llamo la funcion y envio el id del usuario
  this._contactosService.obtenerContactos(idUsuario)
}

showModal = false;

openModal(): void {
  this.showModal = true;
}

closeModal(): void {
  this.showModal = false;
}

formGroup: FormGroup = this._formBuilder.group({
  nombre: '',
  numero: '',
  email: '',
 
});

enviarDatos(){
    //invierte el valor, porq se guarda en string y lo necesito convertir en numero
    const idUsuario = parseInt(localStorage.getItem('idUsuario') || '0');

    //llamo la funcion y envio el id del usuario
    this._contactosService.obtenerContactos(idUsuario)
  const nombre: string= this.formGroup.get('nombre')?.value 
  const numero: string= this.formGroup.get('numero')?.value 
  const correoElectronico: string= this.formGroup.get('email')?.value 

  const contactoData: CrearContactosDto = {
    nombre,
    numero,
    correoElectronico
  }

  this._contactosService.crearContacto(idUsuario,contactoData).pipe(
    catchError(error => {
      swal('!ERROR', 'Contacto crado', 'error');
      console.error('Error al crear el contacto en el componente:', error);
      return[]
    })
  ).subscribe(response => {
    swal('!EXITO', 'Contacto credo', 'success');
  })
}

}
//alzatejuan1280@gmail.com