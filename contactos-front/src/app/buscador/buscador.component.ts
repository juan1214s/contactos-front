import { Component, inject } from '@angular/core';
import { BuscadorService } from '../api/buscador.service';
import { BuscadorDto, DataBuscadorDto } from './model/buscador.interface';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import swal from 'sweetalert';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {
private readonly buscadorService = inject(BuscadorService)
private readonly _formBuilder = inject(FormBuilder)
buscador = this.buscadorService.resultado

formGrup: FormGroup = this._formBuilder.group({
nombre: ''
})

public getBuscador(){
  const nombre: string = this.formGrup.get('nombre')?.value
  const id = 31
  console.log(id)
  console.log(nombre)

  if(!nombre){
    swal('!Error', 'Todos los campos son necesarios', 'error');
    return 
  }
  
const dataBuscador: DataBuscadorDto = {
  id,
  nombre
}

this.buscadorService.buscarContacto(dataBuscador).subscribe(
  (data)=>console.log(data)
)
}


}
