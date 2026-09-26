import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LucideStar } from '@lucide/angular';
import { PERSONAJES_MOCK } from './personajes/personajes.mock';
import { PersonajeCard } from './personajes/personaje-card/personaje-card';


@Component({
  selector: 'app-root',
  imports: [LucideStar, PersonajeCard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly titulo = signal('Directorio de Personajes');

  personajes = signal(PERSONAJES_MOCK);
}
