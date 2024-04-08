import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, input, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { ContactosDto, CrearContactosDto } from '../contactos/model/contactos.interface';
import {catchError, Observable, tap } from 'rxjs';


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

 public crearContacto(id: number, data: CrearContactosDto): Observable<any> {
    const token = this.obtenerToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._http.post<CrearContactosDto>(`${this._endPoint}/${id}`, data, { headers }).pipe(
      catchError(error => {
        console.error(`Error al crear el contacto: ${error}`);
        throw error; 
      })
    );
  }

  public deleteContacto(id: number): Observable<any>{
    const token = this.obtenerToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._http.delete<number>(`${this._endPoint}/${id}`, {headers})
    .pipe(
      catchError(error => {
        console.log(`Ocurrio un error en el servidor: ${error.message}`)
        throw error
      })
    )
  }


}
