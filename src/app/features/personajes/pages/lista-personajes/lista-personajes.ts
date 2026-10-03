import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FavoritosService } from '@core/services/favoritos.service';
import { Paginador } from '@shared/ui/paginador/paginador';
import { FiltrosPersonajes } from '../../components/filtros-personajes/filtros-personajes';
import { PersonajeCard } from '../../components/personaje-card/personaje-card';
import { RAZAS } from '../../models/personaje.model';
import { PersonajesService } from '../../services/personajes.service';

// Página (componente contenedor): tiene el estado, habla con los servicios
// y le pasa datos a los componentes de presentación.
@Component({
  selector: 'app-lista-personajes',
  imports: [FiltrosPersonajes, PersonajeCard, Paginador],
  templateUrl: './lista-personajes.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaPersonajes {
  private readonly servicio = inject(PersonajesService);
  protected readonly favs = inject(FavoritosService);
  protected readonly razas = RAZAS;

  // Estado de la UI (signals)
  protected readonly texto = signal('');
  protected readonly raza = signal('todas');
  protected readonly pagina = signal(1);

  // Un solo objeto con todo lo que define la búsqueda
  private readonly filtro = computed(() => ({
    nombre: this.texto().trim(),
    raza: this.raza(),
    pagina: this.pagina(),
  }));

  // signals -> RxJS (para debounce y switchMap) -> signal otra vez
  private readonly respuesta = toSignal(
    toObservable(this.filtro).pipe(
      debounceTime(300),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      switchMap((f) => this.servicio.buscar(f)),
    ),
  );

  protected readonly cargando = computed(() => this.respuesta() === undefined);
  protected readonly personajes = computed(() => this.respuesta()?.items ?? []);
  protected readonly total = computed(() => this.respuesta()?.meta.totalItems ?? 0);
  protected readonly totalPaginas = computed(() => this.respuesta()?.meta.totalPages ?? 0);

  protected alCambiarTexto(texto: string) {
    this.texto.set(texto);
    this.pagina.set(1); // al cambiar el filtro volvemos a la primera página
  }

  protected alCambiarRaza(raza: string) {
    this.raza.set(raza);
    this.pagina.set(1);
  }
}
