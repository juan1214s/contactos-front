import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../usuario/model/usuario.interface';
import { Observable } from 'rxjs';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

private readonly _endPoint = environment.usuarioApiUrl;
private readonly __httClient = inject(HttpClient);

//como no devuelve nada le pongo any
public crearUsuario(dataUsuario: Usuario): Observable<any> {
  const body = {
    nombre: dataUsuario.nombre,
    apellido: dataUsuario.apellido,
    correoElectronico: dataUsuario.correoElectronico,
    password: dataUsuario.password
  };

  return this.__httClient.post<void>(`${this._endPoint}`, body);
}


}
