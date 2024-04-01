import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { LoginDto, Token } from '../login/models/login.interface'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly _endPoint = environment.loginApiUrl;

 private readonly _httpClient = inject(HttpClient)

//indica q devuelve el tipo Token
public validarUsuario(loginData: LoginDto): Observable<Token> {
    return this._httpClient.post<Token>(`${this._endPoint}`, loginData);
  }
  
}
