import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagina, Personaje } from './personaje';

@Injectable({ providedIn: 'root' })
export class PersonajesService {
  private readonly http = inject(HttpClient);
  private readonly api = 'https://dragonball-api.com/api/characters';

  listar(): Observable<Pagina<Personaje>> {
    return this.http.get<Pagina<Personaje>>(this.api, { params: { limit: 12 } });
  }
}
