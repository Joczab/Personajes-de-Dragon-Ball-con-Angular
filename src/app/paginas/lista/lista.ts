import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LucideSearch } from '@lucide/angular';
import { map } from 'rxjs';
import { PersonajeCard } from '../../personajes/personaje-card/personaje-card';
import { PersonajesService } from '../../personajes/personajes.service';
import { FavoritosService } from '../../personajes/favoritos.service';

@Component({
  selector: 'app-lista',
  imports: [PersonajeCard, LucideSearch],
  templateUrl: './lista.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Lista {
  private readonly servicio = inject(PersonajesService);
  protected readonly favs = inject(FavoritosService);

  protected readonly personajes = toSignal(this.servicio.listar().pipe(map((r) => r.items)), {
    initialValue: [],
  });
  protected readonly razas = ['Saiyan', 'Human', 'Namekian', 'Frieza Race', 'Android', 'Majin', 'God', 'Angel'];

  protected readonly texto = signal('');
  protected readonly raza = signal('todas');

  protected readonly filtrados = computed(() => {
    const t = this.texto().trim().toLowerCase();
    const r = this.raza();
    return this.personajes().filter(
      (p) => p.name.toLowerCase().includes(t) && (r === 'todas' || p.race === r),
    );
  });

  protected alEscribir(evento: Event) {
    this.texto.set((evento.target as HTMLInputElement).value);
  }

  protected alCambiarRaza(evento: Event) {
    this.raza.set((evento.target as HTMLSelectElement).value);
  }
}
