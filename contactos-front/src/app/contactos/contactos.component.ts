import { Component, inject, OnInit } from '@angular/core';
import { ContactosService } from "../api/contactos.service"


@Component({
  selector: 'app-contactos',
  standalone: true,
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export default class ContactosComponent{


private readonly _contactosService = inject(ContactosService);
contactos = this._contactosService.contactos

constructor(){
this._contactosService.obtenerContactos(31)
}

}
