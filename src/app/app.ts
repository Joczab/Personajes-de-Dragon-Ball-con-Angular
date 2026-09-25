import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { LucideSearch, LucideZap } from '@lucide/angular';
import { PERSONAJES_MOCK } from './personajes/personajes.mock';
import { PersonajeCard } from './personajes/personaje-card/personaje-card';

@Component({
  selector: 'app-root',
  imports: [LucideZap, LucideSearch, PersonajeCard],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly titulo = signal('Directorio de Personajes');
  protected readonly personajes = signal(PERSONAJES_MOCK);
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

  protected alEscribir(evento: Event) {
    this.texto.set((evento.target as HTMLInputElement).value);
  }

  protected alCambiarRaza(evento: Event) {
    this.raza.set((evento.target as HTMLSelectElement).value);
  }
}
