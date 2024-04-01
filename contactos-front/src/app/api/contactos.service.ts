import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, input, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { ContactosDto } from '../contactos/model/contactos.interface';
import {tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  private readonly _endPoint = environment.contactosApiUrl;
  private readonly _http = inject(HttpClient);
  private token = 'token';
  public contactos = signal<ContactosDto[]>([]);

  private obtenerToken(): string | null {
    return localStorage.getItem(this.token);
  }

  public obtenerContactos(id: number): any {
    const token = this.obtenerToken();

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this._http.get<ContactosDto[]>(`${this._endPoint}/${id}`, { headers })
      .pipe(
        tap((contactos: ContactosDto[] )=> this.contactos.set(contactos))
      ).subscribe()
    } else {
      throw new Error('Inicia sesion de nuevo');
    }
  }



}
