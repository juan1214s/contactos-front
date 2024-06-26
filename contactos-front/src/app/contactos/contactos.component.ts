import { Component, inject, OnInit } from '@angular/core';
import { ContactosService } from '../api/contactos.service';
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
  imports: [
    HeaderComponent,
    FooterComponent,
    CardComponent,
    BuscadorComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css'],
})
export default class ContactosComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _contactosService = inject(ContactosService);
  //aca accedo a la signal q se encuentra en contactosService
  contactos = this._contactosService.contactos;
  //esta varible recibe el id del usuario del componente hijo card
  public idUsuario = 0;

  //cada vez q se cargue el componente se ejecuta
  ngOnInit(): void {
    //invierte el valor, porq se guarda en string y lo necesito convertir en numero
    const idUsuario = parseInt(localStorage.getItem('idUsuario') || '0');

    //llamo la funcion y envio el id del usuario
    this._contactosService.obtenerContactos(idUsuario);
  }

  //esta es la varible q permite q se muestra la ventana modal
  public showModal = false;

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    const modalContent = document.querySelector('.modal-content'); // Selecciona solo el contenido del modal
    if (modalContent) {
      modalContent.classList.add('fade-out'); 
      setTimeout(() => {
        this.showModal = false;
        location.reload()
      }, 500);
    }
  }
  
  formGroup: FormGroup = this._formBuilder.group({
    nombre: '',
    numero: '',
    email: '',
  });

  private obternerIdCliente() {
    //invierte el valor, porq se guarda en string y lo necesito convertir en numero
    return parseInt(localStorage.getItem('idUsuario') || '0');
  }

  public enviarDatos() {
    const idUsuario = this.obternerIdCliente();

    //llamo la funcion y envio el id del usuario
    this._contactosService.obtenerContactos(idUsuario);
    const nombre: string = this.formGroup.get('nombre')?.value;
    const numero: string = this.formGroup.get('numero')?.value;
    const correoElectronico: string = this.formGroup.get('email')?.value;

    if (!nombre || !numero || !correoElectronico) {
      swal('!Error', 'Todos los campos son necesarios', 'error');
      return;
    }

    //aca se conviere a un objeto los inpust del form
    const contactoData: CrearContactosDto = {
      nombre,
      numero,
      correoElectronico,
    };

    this._contactosService
      .crearContacto(idUsuario, contactoData)
      .pipe(
        catchError((error) => {
          swal('!ERROR', 'Contacto no credo', 'error');
          console.error('Error al crear el contacto en el componente:', error);
          this.closeModal();
          return [];
        })
      )
      .subscribe((response) => {
        swal('!Exito', 'Se ha creado el contacto', 'success')
        this.formGroup.reset();
      });
  }

  //elinar contacto
  public obtenerId(id: number): void {
    this.idUsuario = id;
    this._contactosService
      .deleteContacto(this.idUsuario)
      .pipe(
        catchError((error) => {
          swal('!ERROR', 'El contacto no se ha podido eliminar', 'error');
          console.error(`Error en el servidor ${error.message}`);
          return [];
        })
      )
      .subscribe((response) => {
        swal('!Exito', 'Se ha borrado correctamente el contacto', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  }
}

