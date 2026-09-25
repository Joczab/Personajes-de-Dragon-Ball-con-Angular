import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LucideZap } from '@lucide/angular';
import { PERSONAJES_MOCK } from './personajes/personajes.mock';
import { PersonajeCard } from './personajes/personaje-card/personaje-card';

@Component({
  selector: 'app-root',
  imports: [LucideZap, PersonajeCard],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly titulo = signal('Directorio de Personajes');
  protected readonly personajes = signal(PERSONAJES_MOCK);
}
