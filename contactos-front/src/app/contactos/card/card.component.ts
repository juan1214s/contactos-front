import { Component, EventEmitter, inject, input, Output, signal } from '@angular/core';
import { ContactosService } from '../../api/contactos.service';
import { ContactosDto } from '../model/contactos.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  //elcomponete padre pasa el objeto con los contactos
  contacto = input.required<ContactosDto>();
  
  //esto envia el id del contacto a el componente padre emite un evento al q se pude suscribir
  @Output() enviarId = new EventEmitter<number>()

  //con esto muestro los botones de eliminar y editar
  estadoButton = signal<boolean>(false);
  
 public eleminarContacto(id: number){
    this.enviarId.emit(id)
  }

}
