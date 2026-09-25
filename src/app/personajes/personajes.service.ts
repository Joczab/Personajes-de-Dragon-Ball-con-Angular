import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, throwError } from 'rxjs';
import { Pagina, Personaje, PersonajeDetalle } from './personaje';

export interface Filtro {
  pagina: number;
  nombre: string;
  raza: string;
}

@Injectable({ providedIn: 'root' })
export class PersonajesService {
  private readonly http = inject(HttpClient);
  private readonly api = 'https://dragonball-api.com/api/characters';
  private readonly porPagina = 12;

  listar(): Observable<Pagina<Personaje>> {
    return this.http.get<Pagina<Personaje>>(this.api, { params: { limit: this.porPagina } });
  }

  // Sin filtros la API pagina (?page=2&limit=12).
  // Con filtros (?name=goku o ?race=Saiyan) devuelve un arreglo simple, sin paginación.
  buscar(filtro: Filtro): Observable<Pagina<Personaje>> {
    const hayFiltro = filtro.nombre !== '' || filtro.raza !== 'todas';

    let params = new HttpParams();
    if (hayFiltro) {
      if (filtro.nombre) params = params.set('name', filtro.nombre);
      if (filtro.raza !== 'todas') params = params.set('race', filtro.raza);
    } else {
      params = params.set('page', filtro.pagina).set('limit', this.porPagina);
    }

    return this.http.get<Pagina<Personaje> | Personaje[]>(this.api, { params }).pipe(
      map((r) => (Array.isArray(r) ? unaSolaPagina(r) : r)),
      // Si la API responde 404 lo tratamos como "sin resultados"
      catchError((err: HttpErrorResponse) =>
        err.status === 404 ? of(unaSolaPagina([])) : throwError(() => err),
      ),
    );
  }

  // Varios personajes a la vez: una petición por id, en paralelo
  varios(ids: number[]): Observable<Personaje[]> {
    return ids.length ? forkJoin(ids.map((id) => this.obtener(id))) : of([]);
  }

  obtener(id: number): Observable<PersonajeDetalle> {
    return this.http.get<PersonajeDetalle>(`${this.api}/${id}`);
  }
}

function unaSolaPagina(items: Personaje[]): Pagina<Personaje> {
  return {
    items,
    meta: {
      totalItems: items.length,
      itemCount: items.length,
      itemsPerPage: items.length,
      totalPages: items.length ? 1 : 0,
      currentPage: 1,
    },
  };
}
