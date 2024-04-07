import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cerrar-sesion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cerrar-sesion.component.html',
  styleUrl: './cerrar-sesion.component.css'
})
export class CerrarSesionComponent {

//este evento es el q captura el componete padre
@Output() sesion = new EventEmitter<boolean>()
public estado: boolean = false

cerrarSesion(){
  this.estado = true
  this.sesion.emit(this.estado)
}



}
