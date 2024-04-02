import { Component, inject, OnInit } from '@angular/core';
import { ContactosService } from "../api/contactos.service"
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-contactos',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export default class ContactosComponent{


private readonly _contactosService = inject(ContactosService);
contactos = this._contactosService.contactos

constructor(){
  //invierte el valor, porq se guarda en string y lo necesito convertir en numero
  const idUsuario = parseInt(localStorage.getItem('idUsuario') || '0');

  //llamo la funcion y envio el id del usuario
  this._contactosService.obtenerContactos(idUsuario)
}

}
