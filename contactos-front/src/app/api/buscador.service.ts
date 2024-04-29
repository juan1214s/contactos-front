import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private readonly _http: HttpClient) {}

  buscarContacto(buscador: DataBuscadorDto): Observable<BuscadorDto[]> {
    const {id, nombre} = buscador
    return this._http.get<BuscadorDto[]>(`${this._endPoint}/${id}?nombre=${nombre}`)
      .pipe(
        tap((buscar: BuscadorDto[]) => this.resultado.set(buscar)),
        catchError(error => {
          console.error('Error al buscar contacto:', error);
          return throwError(error);
        })
      );
  }
}
