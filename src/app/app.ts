import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { LucideSearch, LucideStar, LucideZap } from '@lucide/angular';
import { PersonajesService } from './personajes/personajes.service';
import { PersonajeCard } from './personajes/personaje-card/personaje-card';

@Component({
  selector: 'app-root',
  imports: [LucideZap, LucideSearch, LucideStar, PersonajeCard],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly titulo = signal('Directorio de Personajes');
  private readonly servicio = inject(PersonajesService);

  // Observable -> signal. initialValue evita undefined mientras llega la respuesta.
  protected readonly personajes = toSignal(this.servicio.listar().pipe(map((r) => r.items)), {
    initialValue: [],
  });
  protected readonly razas = ['Saiyan', 'Human', 'Namekian', 'Frieza Race', 'Android'];

  // Estado de la UI
  protected readonly texto = signal('');
  protected readonly raza = signal('todas');

  // Estado derivado: se recalcula solo cuando cambia algo de lo que lee
  protected readonly filtrados = computed(() => {
    const t = this.texto().trim().toLowerCase();
    const r = this.raza();
    return this.personajes().filter(
      (p) => p.name.toLowerCase().includes(t) && (r === 'todas' || p.race === r),
    );
  });

  // Favoritos: guardamos solo los ids
  protected readonly favoritos = signal<number[]>(leerFavoritos());
  protected readonly totalFavoritos = computed(() => this.favoritos().length);

  constructor() {
    // effect: efecto secundario cada vez que cambian los favoritos
    effect(() => {
      localStorage.setItem('favoritos', JSON.stringify(this.favoritos()));
    });
  }

  protected esFavorito(id: number) {
    return this.favoritos().includes(id);
  }

  protected alternarFavorito(id: number) {
    // Nunca mutamos: creamos un arreglo nuevo con update()
    this.favoritos.update((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  }

  protected alEscribir(evento: Event) {
    this.texto.set((evento.target as HTMLInputElement).value);
  }

  protected alCambiarRaza(evento: Event) {
    this.raza.set((evento.target as HTMLSelectElement).value);
  }
}

function leerFavoritos(): number[] {
  try {
    return JSON.parse(localStorage.getItem('favoritos') ?? '[]');
  } catch {
    return [];
  }
}
