import { Component, inject, input } from '@angular/core';
import { ContactosService } from '../../api/contactos.service';
import { ContactosDto } from '../model/contactos.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  contacto = input.required<ContactosDto>()

}
