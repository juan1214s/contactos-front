import { Component, inject } from '@angular/core';
import { BuscadorService } from '../api/buscador.service';
import { BuscadorDto, DataBuscadorDto } from './model/buscador.interface';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import swal from 'sweetalert';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {
private readonly buscadorService = inject(BuscadorService)
private readonly _formBuilder = inject(FormBuilder)
buscador = this.buscadorService.resultado
public showModal = false

closeModal(): void {
  const modalContent = document.querySelector('.modal-content'); // Selecciona solo el contenido del modal
  if (modalContent) {
    modalContent.classList.add('fade-out'); 
    setTimeout(() => {
      this.showModal = false;
    }, 500);
  }
}

formGrup: FormGroup = this._formBuilder.group({
nombre: ''
})

private obternerIdCliente(){
    //invierte el valor, porq se guarda en string y lo necesito convertir en numero
  return parseInt(localStorage.getItem('idUsuario')  || '0')
}

public getBuscador(){
  const nombre: string = this.formGrup.get('nombre')?.value
  const id = this.obternerIdCliente();
  
  if(!nombre){
    swal('!Error', 'Todos los campos son necesarios', 'error');
    return 
  }
  
const dataBuscador: DataBuscadorDto = {
  id,
  nombre
}

this.buscadorService.buscarContacto(dataBuscador).subscribe(
  (data)=>{
    this.showModal = true
  },
  (error)=> {
    console.log(error);
    swal('Error', 'No se ha podido encontrar el nombre', 'error');
  }
)

}

}
