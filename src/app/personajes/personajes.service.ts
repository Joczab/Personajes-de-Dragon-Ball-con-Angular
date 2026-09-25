import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagina, Personaje, PersonajeDetalle } from './personaje';

@Injectable({ providedIn: 'root' })
export class PersonajesService {
  private readonly http = inject(HttpClient);
  private readonly api = 'https://dragonball-api.com/api/characters';

  listar(): Observable<Pagina<Personaje>> {
    return this.http.get<Pagina<Personaje>>(this.api, { params: { limit: 12 } });
  }

  obtener(id: number): Observable<PersonajeDetalle> {
    return this.http.get<PersonajeDetalle>(`${this.api}/${id}`);
  }
}
