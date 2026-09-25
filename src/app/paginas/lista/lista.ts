import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { LucideChevronLeft, LucideChevronRight, LucideSearch } from '@lucide/angular';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { PersonajeCard } from '../../personajes/personaje-card/personaje-card';
import { PersonajesService } from '../../personajes/personajes.service';
import { FavoritosService } from '../../personajes/favoritos.service';

@Component({
  selector: 'app-lista',
  imports: [PersonajeCard, LucideSearch, LucideChevronLeft, LucideChevronRight],
  templateUrl: './lista.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Lista {
  private readonly servicio = inject(PersonajesService);
  protected readonly favs = inject(FavoritosService);

  protected readonly razas = ['Saiyan', 'Human', 'Namekian', 'Frieza Race', 'Android', 'Majin', 'God', 'Angel'];

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

  protected alEscribir(evento: Event) {
    this.texto.set((evento.target as HTMLInputElement).value);
    this.pagina.set(1); // al cambiar el filtro volvemos a la primera página
  }

  protected alCambiarRaza(evento: Event) {
    this.raza.set((evento.target as HTMLSelectElement).value);
    this.pagina.set(1);
  }

  protected irA(delta: number) {
    this.pagina.update((p) => p + delta);
  }
}
