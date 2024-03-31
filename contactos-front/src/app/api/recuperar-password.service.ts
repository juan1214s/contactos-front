import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { passwordEmail } from '../recuperar-password/model/rec-password.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecuperarPasswordService {

  private readonly __httClient = inject(HttpClient);
  private readonly _endPoint = environment.recuperarPassword;

  public password(dataUsuario: passwordEmail): Observable<any>{
    const body = { 
      correoElectronico: dataUsuario.correoElectronico,
      password: dataUsuario.password
     }

     return this.__httClient.patch<void>(`${this._endPoint}`, body);
  }

}
