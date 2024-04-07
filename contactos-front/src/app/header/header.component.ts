import { Component, inject } from '@angular/core';
import { CerrarSesionComponent } from '../cerrar-sesion/cerrar-sesion.component';
import { Router, RouterLink } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CerrarSesionComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private readonly router = inject(Router);

  public cerrarSesion(){
    swal({
      title: "Exito!",
      text: "La sesion se cerro",
      icon: "success",
      buttons: {
        confirm: {
          text: "Aceptar",
          value: true
        }
      }
      //demora la transición a la siguiente pagina
    }).then((value) => {
      if (value) {
        setTimeout(()=>{
         this.router.navigate(['/login'])
        },1000);

        localStorage.removeItem('token');
        localStorage.removeItem('idUsuario');
        this.router.navigate(['/login'])
      }
    });
   
  }

}



