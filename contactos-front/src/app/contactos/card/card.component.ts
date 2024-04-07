import { Component, EventEmitter, inject, input, Output } from '@angular/core';
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

  contacto = input.required<ContactosDto>()
  estadoButton: boolean = false


  
}
