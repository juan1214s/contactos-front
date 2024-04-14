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
      timer: 2000,
    })

    setTimeout(()=>{
      //evita q se recargue la pagina al dirigirme a la url
      this.router.navigate(['/login'], {replaceUrl: true})
    },1500);

    localStorage.removeItem('token');
    localStorage.removeItem('idUsuario');
   
  }

}



