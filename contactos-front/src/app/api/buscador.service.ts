import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { BuscadorDto, DataBuscadorDto } from '../buscador/model/buscador.interface';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  private readonly _endPoint = environment.buscadorApiUrl;
  public resultado = signal<BuscadorDto[]>([])
  private token = 'token'
  private readonly _http = inject(HttpClient)
  
  private obtenerToken(): string | null {
    return localStorage.getItem(this.token);
  }

  buscarContacto(buscador: DataBuscadorDto): Observable<BuscadorDto[]> {
    const token = this.obtenerToken();
    const {id, nombre} = buscador
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this._http.get<BuscadorDto[]>(`${this._endPoint}/${id}?nombre=${nombre}`,{headers})
      .pipe(
        tap((buscar: BuscadorDto[]) => this.resultado.set(buscar)),
        catchError(error => {
          console.error('Error al buscar contacto:', error);
          return throwError(error);
        })
      );
  }
}
