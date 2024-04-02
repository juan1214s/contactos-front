import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public token = localStorage.getItem('token');

  // Actualiza la propiedad token cada vez que se llama a isAuth
  isAuth() {
    this.token = localStorage.getItem('token');
    return this.token!.length > 0
  }


}
