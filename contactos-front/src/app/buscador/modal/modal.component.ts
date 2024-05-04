import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ContactosDto } from '../../contactos/model/contactos.interface';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
public dataContacto = input.required<ContactosDto>()
public showModal = false
public closeModal(){
  this.showModal = false
  }
}
