import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { LoginDto, TokenDto } from '../login/models/login.interface'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly _endPoint = environment.loginApiUrl;
  private readonly _httpClient = inject(HttpClient)

//indica q devuelve el tipo Token y le paso un tipado en la data
public validarUsuario(data: LoginDto): Observable<TokenDto> {
    return this._httpClient.post<TokenDto>(`${this._endPoint}`, data);
  }
  
}
